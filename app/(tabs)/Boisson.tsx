import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, View, Text, ScrollView, Dimensions, TouchableOpacity, Image, Linking } from 'react-native';
import { Video } from 'expo-av'; // Importez Video de expo-av
import { homeConfig } from '@/config/Config_HomePage'; // Configuration des assets et autres



export default function HomeScreen() {
  // Mise à jour du compte à rebours

  // Récupérer la hauteur de l'écran
  const screenHeight = Dimensions.get('window').height;

  // Define handleScroll function (example)
  const handleScroll = (event) => {
    // Handle the scroll event if needed (e.g., logging the scroll position)
    console.log(event.nativeEvent.contentOffset.y);
  };

  // Rendu principal
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={[styles.imageContainer, { height: screenHeight }]}>
        <Video
          source={homeConfig.assets.testbar}
          style={styles.backgroundVideos}
          resizeMode="cover"
          shouldPlay
          isLooping
          isMuted
        />
      </View>
      {/* Add other components/content here if needed */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
