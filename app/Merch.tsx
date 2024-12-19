import { Products } from '../data/MerchData';
import React from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Définir un produit
export type MerchProducts = {
  id: string; // Identifiant unique du produit
  name: string; // Nom du produit
  price: string; // Prix du produit
  size: string; // Taille ou dimension du produit
};

export default function Merch() {
  // Fonction pour rendre un produit dans la liste
  const renderProduct = ({ item }: { item: MerchProducts }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text> {/* Afficher le nom du produit */}
      <Text style={styles.productPrice}>{item.price}</Text> {/* Afficher le prix du produit */}
      <Text style={styles.productSize}>Taille: {item.size}</Text> {/* Afficher la taille du produit */}
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      {/* Liste des produits */}
      <FlatList
        data={Products} // Données des produits
        keyExtractor={(item) => item.id} // Clé unique pour chaque produit
        renderItem={renderProduct} // Fonction pour rendre chaque produit
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1, // Prendre tout l'espace disponible
    backgroundColor: '#000', // Couleur de fond noire
    justifyContent: 'center', // Centrer les éléments verticalement
    alignItems: 'center', // Centrer les éléments horizontalement
  },
  listContent: {
    padding: 16, // Espacement autour de la liste
    alignItems: 'center', // Centrer les items dans la liste
  },
  productContainer: {
    padding: 16, // Espacement interne pour chaque produit
    backgroundColor: '#444', // Couleur de fond des produits
    borderRadius: 8, // Coins arrondis
    marginBottom: 12, // Espacement entre les produits
    shadowColor: '#000', // Couleur de l'ombre
    shadowOpacity: 0.1, // Opacité de l'ombre
    shadowRadius: 4, // Rayon de l'ombre
    elevation: 2, // Élévation pour Android
  },
  productName: {
    fontSize: 18, // Taille de police du nom
    fontWeight: 'bold', // Texte en gras
    marginBottom: 4, // Espacement en bas
    color: '#fff', // Couleur du texte blanche
  },
  productPrice: {
    fontSize: 16, // Taille de police du prix
    color: '#ddd', // Couleur du texte
    marginBottom: 4, // Espacement en bas
  },
  productSize: {
    fontSize: 14, // Taille de police pour la taille
    color: '#aaa', // Couleur grise pour le texte
  },
});
