import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, Image, StyleSheet, View } from 'react-native';

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
          android: {
            position: 'absolute',
            height: 80,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
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
        name="village"
        options={{
          title: 'Village',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="village" color={color} />,
        }}
      />

      {/* Bouton Home parfaitement centré */}
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
        name="Merch"
        options={{
          title: 'Merch',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="merch" color={color} />,
        }}
      />

    <Tabs.Screen
        name="MenuBurger"
        options={{
          title: 'Burger',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="hamburger" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 25 : 20, // Ajuste la position verticale pour iOS et Android
    alignSelf: 'center', // Centrage horizontal automatique
    zIndex: 2, // Assure que le bouton est au-dessus de la barre d'onglets
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
