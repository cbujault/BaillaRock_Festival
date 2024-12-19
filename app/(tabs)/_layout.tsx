import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, Image, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { FontAwesome } from 'react-native-vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: 'absolute',
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
      {/* L'importation et la déclaration du composant Village se fait automatiquement grâce à la structure des répertoires */}
      <Tabs.Screen
      name="Programmation"
      options={{
        title: 'Programme',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="playlist-music" size={size} color={color} /> // Icône de note de musique avec FontAwesome
        ),
      }}
    />


      {/* Supprimer la prop `component` ici */}
      <Tabs.Screen
        name="Village" // Utilise le chemin automatique
        options={{
          title: 'Village',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} /> // Icône FontAwesome
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
        name="Boisson" // Utilise le chemin automatique
        options={{
          title: 'Bar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="beer" size={size} color={color} /> // Icône FontAwesome pour un verre de cocktail
          ),
        }}
      />



        <Tabs.Screen
        name="MenuBurger" // Utilise le chemin automatique
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <Feather name="menu" size={size} color={color} /> // Icône FontAwesome
          ),
        }}
      />

    
    </Tabs>
  );
}

const styles = StyleSheet.create({
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
