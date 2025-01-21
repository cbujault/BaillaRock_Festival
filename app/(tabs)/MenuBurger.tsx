// app/Menu.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
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

  return (
    <ImageBackground source={require('../../assets/images/lea.png')} style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      {/* Boutons personnalisés avec des icônes */}
      <TouchableOpacity style={styles.button} onPress={handleNavigateToMerch}>
        <FontAwesome name="shopping-cart" size={20} color="#fff" />
        <Text style={styles.buttonText}>Go to Merch</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleNavigateToPartenaires}>
        <FontAwesome name="users" size={20} color="#fff" />
        <Text style={styles.buttonText}>Go to Partenaires</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

// StyleSheet pour améliorer l'apparence
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couleur semi-transparente sur le fond
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Couleur de fond du bouton
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%', // Largeur du bouton
    justifyContent: 'center', // Centrer le texte et l'icône
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // Ombre pour iOS et Android
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10, // Espacement entre l'icône et le texte
  },
});
