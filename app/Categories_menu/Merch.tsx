import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  Dimensions,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importation d'icône FontAwesome

// Import des images
const BackgroundImage = require('../../assets/images/Merch/Affiche_drag.png');
const TopImage = require('../../assets/images/Merch/sweat.png'); // Image du sweat
const LogoImage = require('../../assets/images/Merch/logo.png'); // Image du logo
const TeeshirtImage = require('../../assets/images/Merch/teeshirt_fest.png'); // Image du teeshirt
const PartImage = require('../../assets/images/Merch/part.png'); // Nouvelle image part

const { width, height } = Dimensions.get('window');

const Merch: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImagePress = (image: number) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      {/* Image de fond fixe */}
      <ImageBackground
        source={BackgroundImage}
        style={styles.backgroundImage}
        imageStyle={{ resizeMode: 'cover' }} // Ajuste l'image de fond pour ne pas être déformée
      >
        {/* Superposition d'un filtre noir en transparence */}
        <View style={styles.overlay} />
      </ImageBackground>

      {/* Contenu scrollable */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Titre "Merchandising" */}
        <Text style={styles.title}>Merchandising</Text>

        {/* Image "sweat" cliquable */}
        <TouchableOpacity onPress={() => handleImagePress(TopImage)}>
          <Image source={TopImage} style={styles.topImage} />
        </TouchableOpacity>

        {/* Image "logo" sous l'image "sweat" */}
        <Image source={LogoImage} style={styles.logoImage} />

        {/* Image "teeshirt_fest" cliquable */}
        <TouchableOpacity onPress={() => handleImagePress(TeeshirtImage)}>
          <Image source={TeeshirtImage} style={styles.teeshirtImage} />
        </TouchableOpacity>

        {/* Nouvelle image "logo" entre teeshirt et part */}
        <Image source={LogoImage} style={styles.logoImage} />

        {/* Nouvelle image "part" sous l'image du logo */}
        <Image source={PartImage} style={styles.partImage} />
      </ScrollView>

      {/* Modal pour afficher l'image en grand */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {/* Croissance de la croix rouge en bas de l'écran */}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <FontAwesome name="times" size={30} color='rgb(14, 93, 8)' />
          </TouchableOpacity>

          {selectedImage && (
            <Image source={selectedImage} style={styles.zoomedImage} />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: height,  // Utilisation de la hauteur de l'écran pour une image de fond fixe
    position: 'absolute',  // L'image reste derrière les autres éléments
    zIndex: -1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Utilisation d'absolue pour recouvrir uniquement l'arrière-plan
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Superposition semi-transparente
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    zIndex: 1, // Assure que le contenu scrollable est au-dessus de l'overlay
    paddingBottom: 50,  // Ajoute un espacement en bas pour éviter que la dernière image touche le bas de l'écran
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'RockSalt',
    textAlign: 'center',
    marginBottom: 20,
  },
  topImage: {
    width: 360,
    height: 280,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    borderRadius: 30,
    zIndex: 2, // Assure que l'image est au-dessus de l'overlay
  },
  logoImage: {
    width: 150,
    height: 120,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    borderRadius: 20,
    zIndex: 2, // Assure que l'image est au-dessus de l'overlay
  },
  teeshirtImage: {
    width: 350,
    height: 370,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    borderRadius: 20,
    zIndex: 2, // Assure que l'image est au-dessus de l'overlay
  },
  partImage: {
    width: 360,
    height: 390,
    marginBottom: 60, // Ajout d'un espacement plus important en bas
    opacity: 0.5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    borderRadius: 20,
    zIndex: 2, // Assure que l'image est au-dessus de l'overlay
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  zoomedImage: {
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: '20%',  // Positionne la croix vers le bas de l'écran
    right: 20,
    zIndex: 3, // Assure que le bouton est au-dessus de l'image
    backgroundColor: 'transparent',
  },
});

export default Merch;
