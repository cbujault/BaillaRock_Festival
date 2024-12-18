import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GroupModal from '../popUp_Groups';


// Définir le type pour un groupe
export type Group = {
  id: string;
  name: string;
  genre: string;
  startTime: string;
  endTime: string;
  image: string;
  description: string;
};

// Définir les props pour l'écran
type DayScreenProps = {
  groups: Group[];
  festivalDate: string; // Date au format "YYYY-MM-DD"
};

function DayScreen({ groups, festivalDate }: DayScreenProps) {
  const flatListRef = useRef<FlatList<Group>>(null);

  // Obtenir l'heure actuelle et la date
  const now = new Date();
  const today = now.toISOString().split('T')[0]; // Format "YYYY-MM-DD"
  const currentTime = now.getHours() + now.getMinutes() / 60;

  // Calculer si on est sur la date actuelle du festival
  const isToday = today === festivalDate;

  // Trouver l'index du groupe en cours (seulement si c'est aujourd'hui)
  const currentIndex = isToday
    ? groups.findIndex((group) => {
        const startTime = parseFloat(group.startTime.split(':')[0]) + parseFloat(group.startTime.split(':')[1]) / 60;
        const endTime = parseFloat(group.endTime.split(':')[0]) + parseFloat(group.endTime.split(':')[1]) / 60;
        return currentTime >= startTime && currentTime <= endTime;
      })
    : -1;

  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = (group: Group) => {
    setSelectedGroup(group);
    setModalVisible(true);
    };
  const closeModal = () => {
    setSelectedGroup(null);
    setModalVisible(false);
  };
  
  // Faire défiler automatiquement au groupe en cours si c'est aujourd'hui
  useEffect(() => {
    if (isToday && currentIndex !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex, isToday]);

  // Calculer la progression en pourcentage (curseur latéral)
  const calculateProgressHeight = () => {
    const totalGroups = groups.length;
  
    // Si aucun groupe ou aucun progrès, la barre reste à 0
    if (totalGroups === 0) return 0;
  
    // Compter les groupes passés et inclure le groupe actuel
    const completedGroups = currentIndex === -1 ? 0 : currentIndex + 1;
  
    // Retourner la hauteur en pourcentage
    return (completedGroups / totalGroups) * 100;
  };
  

  // Convertir une heure en décimal
  const timeToDecimal = (time: string) => {
    const [hours, minutes] = time.split(':').map((x) => parseFloat(x));
    return hours + minutes / 60;
  };

  // Déterminer le style du groupe en fonction de l'heure
  const getGroupStyle = (group: Group) => {
    const startTime = timeToDecimal(group.startTime);
    const endTime = timeToDecimal(group.endTime);

    if (!isToday) {
      return {}; // Pas de mise en évidence si ce n'est pas aujourd'hui
    }

    if (currentTime > endTime) {
      return styles.pastGroup;
    } else if (currentTime >= startTime && currentTime <= endTime) {
      return styles.currentGroup;
    }
    return styles.futureGroup;
  };

  const renderGroup = ({ item }: { item: Group }) => (
    <TouchableOpacity style={[styles.groupContainer]} onPress={() => openModal(item)}>
    <Image source={{ uri: item.image }} style={styles.groupImage} />
    <View style={styles.groupDetails}>
      <Text style={styles.groupName}>{item.name}</Text>
      <Text style={styles.groupGenre}>{item.genre}</Text>
    </View>
      <Text style={styles.groupTime}>
      {item.startTime} - {item.endTime}
    </Text>
    </TouchableOpacity>
    );
    

  return (
    <View style={styles.screenContainer}>
      {/* Curseur d'avancée */}
      <View style={styles.progressContainer}>
        {isToday && (
          <Text style={styles.currentTimeText}>
            {`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`}
          </Text>
        )}
        {/* Barre de progression dynamique */}
        <View style={[styles.progressBar, { height: `${calculateProgressHeight()}%` }]} />
      </View>

      {/* Liste des groupes */}
      <FlatList
        ref={flatListRef}
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={renderGroup}
        getItemLayout={(data, index) => ({ length: 110, offset: 110 * index, index })} // Optimisation pour le défilement
        initialNumToRender={5}
        contentContainerStyle={styles.listContent}
      />
      <GroupModal visible={isModalVisible} onClose={closeModal} group={selectedGroup} />
    </View>
  );
}

// Navigation par onglets pour les deux jours
const Tab = createMaterialTopTabNavigator();

export default function ConcertTabs() {
  const dayOneGroups: Group[] = [
  { id: '1', name: 'Group A', genre: 'Rock', startTime: '18:00', endTime: '19:30', image: 'https://via.placeholder.com/80', description: 'description du groupe' },
  { id: '2', name: 'Group B', genre: 'Jazz', startTime: '19:45', endTime: '21:15', image: 'https://via.placeholder.com/80', description: 'description du groupe' },
  { id: '3', name: 'Group C', genre: 'Pop', startTime: '21:30', endTime: '23:00', image: 'https://via.placeholder.com/80', description: 'description du groupe' },
];
const dayTwoGroups: Group[] = [
  { id: '4', name: 'Group D', genre: 'Metal', startTime: '16:00', endTime: '17:30', image: 'https://via.placeholder.com/80', description: 'description du groupe' },
  { id: '5', name: 'Group E', genre: 'Blues', startTime: '17:45', endTime: '19:15', image: 'https://via.placeholder.com/80', description: 'description du groupe' },
  { id: '6', name: 'Group F', genre: 'Electronic', startTime: '19:30', endTime: '21:00', image: 'https://via.placeholder.com/80', description: 'description du groupe' },
];
  

  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: true, // Active le swipe pour tous les appareils
        tabBarLabelStyle: { 
          fontSize: 20, 
          fontWeight: 'bold', 
          textTransform: 'none', // Garde les textes tels quels (meilleure lisibilité)
          color: '#000',
        },
        tabBarStyle: { 
          height: 60, 
          backgroundColor: '#fff', 
          elevation: 5, // Ombre pour Android
          shadowColor: '#000', // Ombre pour iOS
          shadowOpacity: 0.2, 
          shadowRadius: 4,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#289009', // Couleur de l'indicateur d'onglet
          height: 4, // Épaisseur de l'indicateur
          borderRadius: 2,
        },
        tabBarPressColor: '#c4f1c4', // Animation d'appui
      }}
    >
      <Tab.Screen name="23 Mai">
        {() => <DayScreen groups={dayOneGroups} festivalDate="2025-05-23" />}
      </Tab.Screen>
      <Tab.Screen name="24 Mai">
        {() => <DayScreen groups={dayTwoGroups} festivalDate="2025-05-24" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  progressContainer: {
    width: 20,
    backgroundColor: '#ddd',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#289009',
    position: 'absolute',
    bottom: 0,
  },
  currentTimeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  listContent: {
    paddingBottom: 10,
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  pastGroup: {
    opacity: 0.5,
    backgroundColor: '#e0e0e0',
  },
  currentGroup: {
    backgroundColor: '#ffeb3b',
  },
  futureGroup: {
    opacity: 0.8,
    backgroundColor: '#fff',
  },
  groupImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  groupGenre: {
    fontSize: 14,
    color: '#555',
  },
  groupTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
