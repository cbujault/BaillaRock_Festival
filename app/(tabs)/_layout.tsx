import { Tabs } from 'expo-router';
import React from 'react';
import {
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    // Supprimer le SafeAreaView ici
    <View style={styles.container}>  {/* Utiliser View à la place */}
      {/* Barre d'état non translucide avec un arrière-plan */}
      <StatusBar
        translucent={false}
        backgroundColor={colorScheme === 'dark' ? '#000' : '#fff'}
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            position: 'relative',  // Changer de 'absolute' à 'relative'
            height: 80,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <Tabs.Screen
          name="Programmation"
          options={{
            title: 'Programme',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="playlist-music" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Boisson"
          options={{
            title: 'Bar',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="beer" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarButton: ({ onPress }) => (
              <View style={styles.centerContainer}>
                <TouchableOpacity style={styles.homeButton} onPress={onPress}>
                  <Image
                    source={require('@/assets/images/Museau.png')}
                    style={styles.homeIcon}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="village"
          options={{
            title: 'Village',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="MenuBurger"
          options={{
            title: 'Menu',
            tabBarIcon: ({ color, size }) => (
              <Feather name="menu" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Assure un fond blanc derrière le contenu
  },
  centerContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 25 : 20,
    alignSelf: 'center',
    zIndex: 2,
  },
  homeButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'gray',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  homeIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    resizeMode: 'cover',
  },
});
