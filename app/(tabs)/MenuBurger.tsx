import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; // Pour les icônes

export default function Menu() {
  const router = useRouter();

  // Fonction pour naviguer vers Merch
  const handleNavigateToMerch = () => {
    router.push('../Categories_menu/Merch');
  };

  // Fonction pour naviguer vers Partenaires
  const handleNavigateToPartenaires = () => {
    router.push('../Categories_menu/Partenaire');
  };

    // Fonction pour naviguer vers Prevention
    const handleNavigateToPrevention = () => {
      router.push('../Categories_menu/Prevention');
    };

  return (
    <View style={styles.container}>
      {/* Test d'affichage d'une image sans ImageBackground */}
      <Image
        source={require('../../assets/images/Affiche_fest_25.png')}
        style={styles.backgroundImage}
      />

      {/* Boutons personnalisés avec des icônes */}
      <TouchableOpacity style={styles.button} onPress={handleNavigateToMerch}>
        <FontAwesome name="shopping-cart" size={20} color="#fff" />
        <Text style={styles.buttonText}>Merchandising</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleNavigateToPartenaires}>
        <FontAwesome name="users" size={20} color="#fff" />
        <Text style={styles.buttonText}>Les partenaires</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleNavigateToPrevention}>
        <FontAwesome name="warning" size={20} color="#fff" />
        <Text style={styles.buttonText}>Prevention</Text>
      </TouchableOpacity>
    </View>
  );
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1, // Cela permet au conteneur de prendre toute la taille de l'écran
    justifyContent: 'center', // Centrer les éléments verticalement
    alignItems: 'center', // Centrer les éléments horizontalement
    padding: 20,
  },
  backgroundImage: {
    position: 'absolute', // Permet de placer l'image derrière tout le contenu
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '210%', // S'assure que l'image occupe toute la largeur de l'écran
    height: '160%', // S'assure que l'image occupe toute la hauteur de l'écran
    zIndex: -1, // S'assure que l'image reste en arrière-plan
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#388E3C', // Couleur de fond du bouton
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%', // Largeur du bouton
    justifyContent: 'center', // Centrer le texte et l'icône
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10, // Espacement entre l'icône et le texte
  },
});
