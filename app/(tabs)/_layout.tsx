import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, Image, StyleSheet, View, Dimensions } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // État pour suivre la largeur de l'écran
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  // Écouteur pour gérer les changements de dimensions (rotation, redimensionnement)
  useEffect(() => {
    const onChange = ({ window }) => {
      setScreenWidth(window.width);
    };

    Dimensions.addEventListener('change', onChange);

    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: 80,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          default: {
            height: 80,
          },
        }),
      }}
    >
      {/* Autres écrans */}
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

      {/* Bouton Home centré dynamiquement */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarButton: ({ onPress }) => (
            <View style={[styles.centerContainer, { left: screenWidth / 2 - 35 }]}>
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
        name="burger"
        options={{
          title: 'Burger',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="hamburger" color={color} />,
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

      <Tabs.Screen
        name="popUp_Groups"
        options={{ tabBarButton: () => null, headerShown: false }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    position: 'absolute',
    top: -30, // Le bouton dépasse légèrement la barre
    zIndex: 2,
  },
  homeButton: {
    width: 70,
    height: 70,
    borderRadius: 35, // Bouton rond
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'gray',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Pour Android
  },
  homeIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    resizeMode: 'cover',
  },
});
