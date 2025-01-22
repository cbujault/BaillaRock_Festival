import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GroupModal from '../popUp_Groups';
import { dayOneGroups, dayTwoGroups } from '../../data/groupsData';

const { width, height } = Dimensions.get('window');

// Définir le type pour un groupe
export type Group = {
  id: string;
  name: string;
  genre: string;
  startTime: string;
  endTime: string;
  image: ImageSourcePropType;
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
  const [currentTime, setCurrentTime] = useState(
    now.getHours() + now.getMinutes() / 60,
  );

  // Calculer si on est sur la date actuelle du festival
  const isToday = today === festivalDate;

  // Trouver l'index du groupe en cours (seulement si c'est aujourd'hui)
  const currentIndex = isToday
    ? groups.findIndex((group) => {
        const startTime = timeToDecimal(group.startTime);
        const endTime = timeToDecimal(group.endTime);
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
    // Mettre à jour l'heure toutes les minutes pour une progression fluide
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.getHours() + now.getMinutes() / 60);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isToday && currentIndex >= 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex, isToday]);  

  // Calculer la progression en pourcentage (curseur latéral)
  const calculateProgressHeight = () => {
    const totalDuration = groups.reduce(
      (acc, group) =>
        acc +
        (timeToDecimal(group.endTime) - timeToDecimal(group.startTime)),
      0,
    );

    if (totalDuration === 0 || !isToday) return 0;

    const elapsedTime = groups.reduce((acc, group, index) => {
      const startTime = timeToDecimal(group.startTime);
      const endTime = timeToDecimal(group.endTime);
      if (currentTime >= endTime) {
        return acc + (endTime - startTime);
      } else if (currentTime >= startTime && currentTime <= endTime) {
        return acc + (currentTime - startTime);
      }
      return acc;
    }, 0);

    return (elapsedTime / totalDuration) * 100;
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
      <Image source={item.image} style={styles.groupImage} />
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
    <SafeAreaView style={styles.screenContainer}>
      {/* Curseur d'avancée */}
      <View style={styles.progressContainer}>
        {isToday && (
          <Text style={styles.currentTimeText}>
            {`${Math.floor(currentTime)}:${Math.round(
              (currentTime % 1) * 60,
            )
              .toString()
              .padStart(2, '0')}`}
          </Text>
        )}
        {/* Barre de progression dynamique */}
        <View
          style={[
            styles.progressBar,
            { height: `${calculateProgressHeight()}%` },
          ]}
        />
      </View>

      {/* Liste des groupes */}
      <FlatList
        ref={flatListRef}
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={renderGroup}
        getItemLayout={(data, index) => ({
          length: 110,
          offset: 110 * index,
          index,
        })}
        initialNumToRender={5}
        contentContainerStyle={styles.listContent}
      />
      <GroupModal visible={isModalVisible} onClose={closeModal} group={selectedGroup} />
    </SafeAreaView>
  );
}

// Navigation par onglets pour les deux jours
const Tab = createMaterialTopTabNavigator();

export default function ConcertTabs() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: true,
          tabBarLabelStyle: { fontSize: 20, fontWeight: 'bold', textTransform: 'none', color: '#000', textAlign: 'center', width: '100%' },
          tabBarStyle: { height: 80, backgroundColor: '#fff', elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4, justifyContent: 'center' },
          tabBarIndicatorStyle: { backgroundColor: '#289009', height: 4, borderRadius: 2 },
          tabBarPressColor: '#c4f1c4',
        }}
      >
        <Tab.Screen name="Ven. 23 Mai">
          {() => <DayScreen groups={dayOneGroups} festivalDate="2025-05-23" />}
        </Tab.Screen>
        <Tab.Screen name="Sam. 24 Mai">
          {() => <DayScreen groups={dayTwoGroups} festivalDate="2025-05-24" />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: 100,
  },
  progressContainer: {
    width: width * 0.05,
    backgroundColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.02,
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#289009',
    position: 'absolute',
    bottom: 0,
    borderRadius: 8,
  },
  currentTimeText: {
    fontSize: height * 0.015,
    fontWeight: '600',
    color: '#333',
    marginBottom: height * 0.005,  
  },
  listContent: {
    paddingBottom: height * 0.02,
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.03,
    backgroundColor: '#f0f0f0',
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.03,
    borderRadius: 10,
  },
  pastGroup: {
    opacity: 0.5,
    backgroundColor: '#e0e0e0',
  },
  currentGroup: {
    backgroundColor: '#62ff3b',
  },
  futureGroup: {
    opacity: 0.8,
    backgroundColor: '#fff',
  },
  groupImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 10,
    marginRight: width * 0.03,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
  },
  groupGenre: {
    fontSize: height * 0.018,
    color: '#555',
  },
  groupTime: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
    color: '#333',
  },
});