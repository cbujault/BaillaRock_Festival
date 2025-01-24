import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import ExpoModal from '../popUp_Expo'; 
import { Exposants } from '../../data/ExposantsData';

const { width } = Dimensions.get('window');

// Type pour un exposant (importé depuis `ExposantsData.ts`)
export type ListExpo = {
  id : string; 
  name: string;
  genre: string;
  description: string;
  image: number;
};

// Largeur par défaut (modifiable)
const EXPO_CONTAINER_WIDTH = width / 2 - 70;

export default function Village() {
  const [selectedExpo, setSelectedExpo] = useState<ListExpo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [expoWidth, setExpoWidth] = useState(EXPO_CONTAINER_WIDTH); // État pour ajuster la largeur

  const handleExpoPress = (expo: ListExpo) => {
    setSelectedExpo(expo);
    setModalVisible(true);
  };

  return (
    <View style={styles.screenContainer}>
      {/* Titre de la page */}
      <Text style={styles.pageTitle}>Exposants</Text>

      {/* Slider pour ajuster la largeur (optionnel) */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Largeur des exposants : {Math.round(expoWidth)} px</Text>
        <input
          type="range"
          min="100"
          max={width - 50}
          value={expoWidth}
          onChange={(e) => setExpoWidth(Number(e.target.value))}
          style={styles.slider}
        />
      </View>

      {/* Liste horizontale des exposants */}
      <ScrollView 
        horizontal 
        contentContainerStyle={styles.horizontalListContent}
        showsHorizontalScrollIndicator={false}
      >
        {Exposants.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.expoContainer, { width: expoWidth }]} // Largeur dynamique
            onPress={() => handleExpoPress(item)}
          >
            <Image style={[styles.expoImage, { width: expoWidth - 40 }]} source={item.image} resizeMode="contain" />
            <Text style={styles.expoName}>{item.name || 'Nom inconnu'}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal pour afficher les détails d'un exposant */}
      <ExpoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        expo={selectedExpo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 8,
    paddingTop: 70, // Ajout d'un espace en haut
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24, // Plus d'espace en dessous du titre
  },
  sliderContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  sliderLabel: {
    color: '#fff',
    marginBottom: 8,
  },
  slider: {
    width: width - 50,
  },
  horizontalListContent: {
    flexDirection: 'row', // Aligner horizontalement
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  expoContainer: {
    padding: 8,
    backgroundColor: '#444',
    borderRadius: 8,
    marginHorizontal: 8, // Espacement horizontal entre les éléments
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
    height: width / 4 - 32,
    marginBottom: 8,
    borderRadius: 10,
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40, // Ajout d'espace si la liste est vide
  },
});
