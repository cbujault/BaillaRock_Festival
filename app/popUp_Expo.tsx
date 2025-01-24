import * as React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Pour les icônes des réseaux sociaux
import { ImageSourcePropType } from 'react-native';
import { Linking } from 'react-native';


export type Expo = {
  name: string; // Nom 
  genre: string; // Genre 
  image: ImageSourcePropType; // Source de l'image (require)
  description: string; // Description détaillée
};

export type ExpoModalProps = {
  visible: boolean; // Afficher ou non le modal
  onClose: () => void; // Fonction pour fermer le modal
  expo: Expo | null; // Exposant sélectionné ou null si aucun
};

export default function ExpoModal({ visible, onClose, expo }: ExpoModalProps) {
  if (!expo) return null; // Ne pas afficher le modal si aucun exposant n'est sélectionné

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        {/* Bannière supérieure avec l'image et le texte */}
        <View style={styles.banner}>
          <View style={styles.textContainer}>
            <Text style={styles.expoName}>{expo.name}</Text>
            <Text style={styles.expoGenre}>{expo.genre}</Text>
          </View>
          <Image source={expo.image} style={styles.expoImage} resizeMode="contain" />
        </View>

        {/* Contenu principal */}
        <View style={styles.content}>
          <Text style={styles.description}>{expo.description}</Text>
          {/* Icônes des réseaux sociaux */}
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="facebook" size={40} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="twitter" size={40} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="instagram" size={40} color="#E1306C" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Icône de fermeture */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <FontAwesome name="times" size={30} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Ombre d'arrière-plan pour le modal
  },
  banner: {
    height: '25%',
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 50,
  },
  textContainer: {
    flex: 1,
  },
  expoName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000',
  },
  expoGenre: {
    fontSize: 15,
    color: 'gray',
  },
  expoImage: {
    width: 130, // Taille de l'image
    height: 120,
    borderRadius: 30,
    marginLeft: -60, // Décalage de l'image vers la gauche (valeur négative)
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    textAlign: 'justify',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Espacement égal entre les icônes
    marginTop: 20,
  },
  iconButton: {
    padding: 20, // Plus de padding autour des icônes pour les rendre plus cliquables
  },
  closeButton: {
    position: 'absolute',
    top: 60, 
    right: 15, // Décalage depuis la droite
    zIndex: 40, // S'assurer que la croix soit au-dessus des autres éléments
  },
});
