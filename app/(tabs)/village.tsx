import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import ExpoModal from '../popUp_Expo';
import { backgroundImage, Exposants } from '../../data/ExposantsData';
import { Food } from '../../data/FoodData';
import * as Font from 'expo-font';

const { width } = Dimensions.get('window');
const CONTAINER_WIDTH = width / 2 - 60;
const IMAGE_HEIGHT = width / 2 - 60;

export type ListExpo = {
  id: string;
  name: string;
  genre: string;
  description: string;
  image: number;
  imageBG: number;
  socialLinks: SocialLink[];
};

export type SocialLink = {
  name: string;
  url: string;
};

export type ListFood = {
  id: string;
  name: string;
  genre: string;
  description: string;
  image: number;
  imageBG: number;
  socialLinks: SocialLink[];
};

export default function Village() {
  const [selectedExpo, setSelectedExpo] = useState<ListExpo | ListFood | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  const handleExpoPress = (expo: ListExpo | ListFood) => {
    setSelectedExpo(expo);
    setModalVisible(true);
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Capsmall': require('../../assets/fonts/Capsmall.ttf'),
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.screenContainer}>
        {/* Section Exposants */}
        <Text style={[styles.pageTitle, styles.expoTitle]}>Exposants</Text>
        <ScrollView horizontal contentContainerStyle={styles.horizontalListContent} showsHorizontalScrollIndicator={false}>
          {Exposants.map((item) => (
            <TouchableOpacity key={item.id} style={styles.container} onPress={() => handleExpoPress(item)}>
              <Image style={styles.expoImage} source={item.image} resizeMode="contain" />
              <Text style={styles.expoName}>{item.name || 'Nom inconnu'}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section Food */}
        <Text style={[styles.pageTitle, styles.foodTitle]}>Food</Text>
        <ScrollView horizontal contentContainerStyle={styles.horizontalListContent} showsHorizontalScrollIndicator={false}>
          {Food.map((item) => (
            <TouchableOpacity key={item.id} style={styles.container} onPress={() => handleExpoPress(item)}>
              <Image style={styles.foodImage} source={item.image} resizeMode="contain" />
              <Text style={styles.expoName}>{item.name || 'Nom inconnu'}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Modal commun */}
        <ExpoModal visible={modalVisible} onClose={() => setModalVisible(false)} item={selectedExpo} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 8,
    paddingTop: 70,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    marginBottom: 15,
    fontFamily: 'Capsmall',
  },
  expoTitle: {
    marginTop: 90,
  },
  foodTitle: {
    marginTop: -20,
  },
  horizontalListContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  container: {
    width: CONTAINER_WIDTH,
    padding: 8,
    backgroundColor: '#444',
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expoName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#fff',
    textAlign: 'center',
  },
  expoImage: {
    width: CONTAINER_WIDTH - 40,
    height: IMAGE_HEIGHT,
    marginBottom: 8,
    borderRadius: 10,
  },
  foodImage: {
    width: CONTAINER_WIDTH - 40,
    height: CONTAINER_WIDTH - 40, // Assurez-vous que la largeur et la hauteur sont identiques
    marginBottom: 8,
    borderRadius: (CONTAINER_WIDTH - 40) / 2, // Pour rendre l'image circulaire
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingText: {
    color: 'white',
    fontSize: 20,
  },
});
