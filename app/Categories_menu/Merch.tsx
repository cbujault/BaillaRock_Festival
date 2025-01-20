import { Products } from '../../data/MerchData';
import React from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import {Image} from 'react-native'; 
const { width} = Dimensions.get('window');

// Définir un produit
export type MerchProducts = {
  id: string; // Identifiant unique du produit
  name: string; // Nom du produit
  price: string; // Prix du produit
  size: string; // Taille ou dimension du produit
  image: number; //image
};

export default function Merch() {
  // Fonction pour rendre un produit dans la liste
  const renderProduct = ({ item }: { item: MerchProducts }) => (
    <View style={styles.productContainer}>
      <Image style={styles.productImage} source={item.image} />
      {/* Vérification pour éviter les valeurs nulles ou indéfinies */}
      <Text style={styles.productName}>{item.name || 'Produit inconnu'}</Text>
      <Text style={styles.productPrice}>{item.price || 'Prix non disponible'}</Text>
      <Text style={styles.productSize}>
        {item.size ? `Taille: ${item.size}` : 'Taille inconnue'}
      </Text>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      {/* Liste des produits */}
      <FlatList
        data={Products} // Données des produits
        keyExtractor={(item) => item.id} // Clé unique pour chaque produit
        renderItem={renderProduct} // Fonction pour rendre chaque produit
        numColumns={2} // Nombre de colonnes
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
            Aucun produit disponible
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1, // Prendre tout l'espace disponible
    backgroundColor: '#000', // Couleur de fond noire
    //justifyContent: 'center', // Centrer les éléments verticalement
    padding : 8,
    //alignItems: 'center', // Centrer les éléments horizontalement
  },
  listContent: {
    //padding: 16, // Espacement autour de la liste
    //alignItems: 'center', // Centrer les items dans la liste
    paddingBottom : 16, 
    justifyContent: 'center',
  },
  productContainer: {
    flex : 1,
    padding: 8, // Espacement interne pour chaque produit
    backgroundColor: '#444', // Couleur de fond des produits
    borderRadius: 8, // Coins arrondis
    margin: 8, // Espacement entre les produits
    shadowColor: '#000', // Couleur de l'ombre
    shadowOpacity: 0.1, // Opacité de l'ombre
    shadowRadius: 4, // Rayon de l'ombre
    elevation: 2, // Élévation pour Android
    alignItems : 'center',
  },
  productName: {
    fontSize: 16, // Taille de police du nom
    fontWeight: 'bold', // Texte en gras
    marginBottom: 4, // Espacement en bas
    color: '#fff', // Couleur du texte blanche
  },
  productPrice: {
    fontSize: 14, // Taille de police du prix
    color: '#ddd', // Couleur du texte
    marginBottom: 4, // Espacement en bas
  },
  productSize: {
    fontSize: 12, // Taille de police pour la taille
    color: '#aaa', // Couleur grise pour le texte
  },
  productImage: {
    width: width / 2 - 48, //largeur image 
    height : width / 2 - 48, //hauteur image 
    marginBottom: 8, //espacement en dessous de image
    borderRadius : 8,
  }
});
