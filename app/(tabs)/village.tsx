import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import ExpoModal from '../popUp_Expo'; 
import { Exposants } from '../../data/ExposantsData'; 
import { Food } from '../../data/FoodData'; 

const { width } = Dimensions.get('window');

// Taille constante des containers
const CONTAINER_WIDTH = width / 2 - 60;
const IMAGE_HEIGHT = width / 2 - 60;

export type ListExpo = {
  id: string; 
  name: string;
  genre: string;
  description: string;
  image: number;
};
export type ListFood = {
  id: string; 
  name: string;
  genre: string;
  description: string;
  image: number;
};

export default function Village() {
  const [selectedExpo, setSelectedExpo] = useState<ListExpo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleExpoPress = (expo: ListExpo) => {
    setSelectedExpo(expo);
    setModalVisible(true);
  };

  return (
    <View style={styles.screenContainer}>
      {/* Section Exposants */}
      <Text style={[styles.pageTitle, styles.expoTitle]}>Exposants</Text>
      <ScrollView 
        horizontal 
        contentContainerStyle={styles.horizontalListContent}
        showsHorizontalScrollIndicator={false}
      >
        {Exposants.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.container}
            onPress={() => handleExpoPress(item)}
          >
            <Image 
              style={styles.expoImage} 
              source={item.image} 
              resizeMode="contain" 
            />
            <Text style={styles.expoName}>{item.name || 'Nom inconnu'}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Section Food */}
      <Text style={[styles.pageTitle, styles.foodTitle]}>Food</Text>
      <ScrollView 
        horizontal 
        contentContainerStyle={styles.horizontalListContent}
        showsHorizontalScrollIndicator={false}
      >
        {Food.map((ListFood) => ( 
          <TouchableOpacity
            key={ListFood.id} 
            style={styles.container}
            onPress={() => handleExpoPress(ListFood)} 
          >
            <Image 
              style={styles.expoImage} 
              source={ListFood.image} 
              resizeMode="contain" 
            />
            <Text style={styles.expoName}>{ListFood.name || 'Nom inconnu'}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal commun pour les deux sections */}
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
    paddingTop: 70,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    marginBottom: 15,
  },
  expoTitle: {
    marginTop: 90, // Ajout d’un espace pour descendre la section Exposants
  },
  foodTitle: {
    marginTop: -20, // Réduction pour rapprocher la section Food
  },
  horizontalListContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  container: {  
    width: CONTAINER_WIDTH, // Largeur fixe
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
    width: CONTAINER_WIDTH - 40, // pour modifier la taille du logo
    height: IMAGE_HEIGHT, // Hauteur fixe pour uniformiser les images
    marginBottom: 8,
    borderRadius: 10,
  },
});
