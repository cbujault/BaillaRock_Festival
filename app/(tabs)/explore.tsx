import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GroupModal from './popUp_Groups';

export type Group = {
  id: string;
  name: string;
  genre: string;
  startTime: string;
  endTime: string;
  image: string;
  description : string;
};

type DayScreenProps = {
  groups: Group[];
  festivalDate: string;
};

function DayScreen({ groups, festivalDate }: DayScreenProps) {
  const flatListRef = useRef<FlatList<Group>>(null);
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentTime = now.getHours() + now.getMinutes() / 60;
  const isToday = today === festivalDate;
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

  useEffect(() => {
    if (isToday && currentIndex !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex, isToday]);

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
      <FlatList
        ref={flatListRef}
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={renderGroup}
        contentContainerStyle={styles.listContent}
      />
      <GroupModal visible={isModalVisible} onClose={closeModal} group={selectedGroup} />
    </View>
  );
}

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
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
        tabBarStyle: { height: 50 },
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
  screenContainer: { flex: 1 },
  listContent: { paddingBottom: 10 },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  groupImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  groupDetails: { flex: 1 },
  groupName: { fontSize: 18, fontWeight: 'bold' },
  groupGenre: { fontSize: 14, color: '#555' },
  groupTime: { fontSize: 16, fontWeight: 'bold', color: '#333' },
});
