import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

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
      {/* Bouton Burger dans la barre de navigation */}
     

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Village"
        options={{
          title: 'Village',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="home" color={color} />,
        }}
      />

      {/* Bouton Home au centre, on le déplace dans la position normale */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarButton: ({ onPress }) => (
            <TouchableOpacity
              style={styles.homeButton}
              onPress={onPress}
            >
              <Image
                source={require('@/assets/images/Museau.png')}  // Remplacez par l'image de votre choix
                style={styles.homeIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="burger"
        options={{
          title: 'Burger',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="hamburger" color={color} />, // Remplacez par l'icône appropriée
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bell" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  homeButton: {
    width: 70,
    height: 70,
    borderRadius: 35,  // Pour rendre le bouton rond
    backgroundColor: '#fff',  // Couleur de fond du bouton
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',  // Positionnement absolu
    top: -30,  // Ajuste la position verticale du bouton
    left: '50%',  // Positionne le bouton à 40% de la largeur de l'écran
    transform: [{ translateX: -35 }],  // Décale le bouton vers la gauche de la moitié de sa largeur (70 / 2 = 35)
    borderWidth: 2,
    borderColor: 'gray',  // Couleur de la bordure
    zIndex: 2,  // S'assurer que le bouton soit au-dessus des autres icônes
  },
  homeIcon: {
    width: '100%',  // L'image prend toute la largeur du bouton
    height: '100%',  // L'image prend toute la hauteur du bouton
    borderRadius: 35,  // Assurez-vous que l'image soit ronde en respectant le rayon du bouton
    resizeMode: 'cover',  // L'image se recadre pour remplir le bouton sans déformation
  },
});
