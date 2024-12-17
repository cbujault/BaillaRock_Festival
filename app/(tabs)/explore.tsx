import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Définir le type pour un groupe
type Group = {
  id: string;
  name: string;
  genre: string;
  time: string;
  image: string;
};

// Définir les props pour l'écran
type DayScreenProps = {
  groups: Group[];
};

function DayScreen({ groups }: DayScreenProps) {
  const flatListRef = useRef<FlatList<Group>>(null);

  // Récupérer l'heure actuelle pour le calcul de progression
  const currentTime = new Date().getHours() + new Date().getMinutes() / 60;

  // Trouver l'index du groupe en cours
  const currentIndex = groups.findIndex((group) => {
    const groupTime = parseFloat(group.time.split(':')[0]) + parseFloat(group.time.split(':')[1]) / 60;
    return groupTime >= currentTime;
  });

  // Faire défiler automatiquement au groupe en cours
  useEffect(() => {
    if (currentIndex !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex]);

  // Calculer la progression en pourcentage
  const calculateProgress = () => {
    const totalGroups = groups.length;
    const progress = currentIndex === -1 ? totalGroups : currentIndex;
    return (progress / totalGroups) * 100;
  };

  const renderGroup = ({ item }: { item: Group }) => {
    const groupTime = parseFloat(item.time.split(':')[0]) + parseFloat(item.time.split(':')[1]) / 60;
    const isPast = groupTime < currentTime;
    const isCurrent = groupTime >= currentTime && groupTime - currentTime <= 1;

    return (
      <View
        style={[
          styles.groupContainer,
          isPast && styles.pastGroup,
          isCurrent && styles.currentGroup,
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.groupImage} />
        <View style={styles.groupDetails}>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.groupGenre}>{item.genre}</Text>
        </View>
        <Text style={styles.groupTime}>{item.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      {/* Curseur d'avancée */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { height: `${calculateProgress()}%` }]} />
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
    </View>
  );
}

// Navigation par onglets pour les deux jours
const Tab = createMaterialTopTabNavigator();

export default function TabTwoScreen() {
  const dayOneGroups: Group[] = [
    { id: '1', name: 'Group A', genre: 'Rock', time: '14:00', image: 'https://via.placeholder.com/80' },
    { id: '2', name: 'Group B', genre: 'Jazz', time: '16:30', image: 'https://via.placeholder.com/80' },
    { id: '3', name: 'Group C', genre: 'Pop', time: '19:00', image: 'https://via.placeholder.com/80' },
  ];

  const dayTwoGroups: Group[] = [
    { id: '4', name: 'Group D', genre: 'Metal', time: '13:00', image: 'https://via.placeholder.com/80' },
    { id: '5', name: 'Group E', genre: 'Blues', time: '15:30', image: 'https://via.placeholder.com/80' },
    { id: '6', name: 'Group F', genre: 'Electronic', time: '18:00', image: 'https://via.placeholder.com/80' },
  ];

  return (
    <Tab.Navigator>
      <Tab.Screen name="Day 1">
        {() => <DayScreen groups={dayOneGroups} />}
      </Tab.Screen>
      <Tab.Screen name="Day 2">
        {() => <DayScreen groups={dayTwoGroups} />}
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
    width: 10,
    backgroundColor: '#ddd',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#ff6347',
    position: 'absolute',
    bottom: 0,
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
