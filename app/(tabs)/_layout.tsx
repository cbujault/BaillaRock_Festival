import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';


const { width } = Dimensions.get('window'); // Obtenir la largeur de l'écran

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'green', // Couleur des icônes/titres actifs
        tabBarInactiveTintColor: 'gray', // Couleur des icônes/titres inactifs
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: 80,  // Ajuste la hauteur de la barre de navigation
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          },
          default: {},
        }),
      }}
    >
      {/* Écran Explore */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />

      {/* Écran Village */}
      <Tabs.Screen
        name="Village"
        options={{
          title: 'Village',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="home" color={color} />,
        }}
      />

      {/* Bouton Home centré automatiquement */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarButton: ({ onPress }) => (
            <TouchableOpacity
              style={[styles.homeButton, { left: (width - 325) / 2 }]} // Calcul dynamique pour centrer
              onPress={onPress}
            >
              <Image
                source={require('@/assets/images/Museau.png')} // Remplacez par votre image
                style={styles.homeIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Écran Burger */}
      <Tabs.Screen
        name="burger"
        options={{
          title: 'Burger',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="hamburger" color={color} />,
        }}
      />

      {/* Écran Notifications */}
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bell" color={color} />,
        }}
      />

      {/* Écran Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="user" color={color} />,
        }}
      />

      {/* Écran Groups */}
      <Tabs.Screen 
        name="popUp_Groups" 
        options={{ tabBarButton: () => null, headerShown: false }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  homeButton: {
    width: 70,
    height: 70,
    borderRadius: 35, // Rendre le bouton rond
    backgroundColor: '#fff', // Couleur de fond
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Permet le flottement
    top: -30, // Ajuste la position verticale
    borderWidth: 2,
    borderColor: 'gray', // Couleur de la bordure
    zIndex: 2, // S'assurer qu'il est au-dessus des autres éléments
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Pour Android
  },
  homeIcon: {
    width: '100%', // L'image remplit le bouton
    height: '100%',
    borderRadius: 35,
    resizeMode: 'cover', // Adapte l'image au bouton sans déformation
  },
});