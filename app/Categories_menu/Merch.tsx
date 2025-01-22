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
  GestureResponderEvent,
} from 'react-native';

// Import des images
const BackgroundImage = require('../../assets/images/Merch/Affiche_drag.png');
const TopImage = require('../../assets/images/Merch/sweat.png'); // Image du sweat
const LogoImage = require('../../assets/images/Merch/logo.png'); // Image du logo
const TeeshirtImage = require('../../assets/images/Merch/teeshirt_fest.png'); // Image du teeshirt
const PartImage = require('../../assets/images/Merch/part.png'); // Nouvelle image part

const { width } = Dimensions.get('window');

const Merch: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImagePress = (image: number) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = (event?: GestureResponderEvent) => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <ImageBackground
      source={BackgroundImage}
      style={styles.backgroundImage}
    >
      {/* Superposition d'un filtre noir en transparence */}
      <View style={styles.overlay} />

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

        {/* Nouvelle image "part" sous l'image du teeshirt */}
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
          <TouchableOpacity style={styles.modalOverlay} onPress={closeModal} />
          {selectedImage && (
            <Image source={selectedImage} style={styles.zoomedImage} />
          )}
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
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
  },
  partImage: {
    width: 360,
    height: 450,
    marginBottom: 20,
    opacity: 0.5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    borderRadius: 20,
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
});

export default Merch;
