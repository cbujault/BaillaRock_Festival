import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ImageBackground, Image, Text, Dimensions, ScrollView, Modal, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Hook pour la navigation
import { useRouter } from 'expo-router'; // Hook pour la navigation entre les pages

// Import des images
const BackgroundImage = require('../../assets/images/Merch/Affiche_drag.png');
const TopImage = require('../../assets/images/Merch/sweat.png');
const LogoImage = require('../../assets/images/Merch/logo.png');
const TeeshirtImage = require('../../assets/images/Merch/teeshirt_fest.png');
const PartImage = require('../../assets/images/Merch/part.png');

const { width, height } = Dimensions.get('window');

const Merch: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      title: MerchConfig.texts.title,
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={30} color="'rgb(14, 93, 8)'" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      ),
      headerShown: true,
    });
  }, [navigation, router]);

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
      <ImageBackground source={MerchConfig.images.background} style={styles.backgroundImage}>
        <View style={styles.overlay} />
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{MerchConfig.texts.title}</Text>

        <TouchableOpacity onPress={() => handleImagePress(MerchConfig.images.top)}>
          <Image source={MerchConfig.images.top} style={styles.topImage} />
        </TouchableOpacity>

        <Image source={MerchConfig.images.logo} style={styles.logoImage} />

        <TouchableOpacity onPress={() => handleImagePress(MerchConfig.images.teeshirt)}>
          <Image source={MerchConfig.images.teeshirt} style={styles.teeshirtImage} />
        </TouchableOpacity>

        <Image source={MerchConfig.images.logo} style={styles.logoImage} />
        <Image source={MerchConfig.images.part} style={styles.partImage} />
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <FontAwesome name="times" size={30} color={MerchConfig.colors.backButton} />
          </TouchableOpacity>
          {selectedImage && <Image source={selectedImage} style={styles.zoomedImage} />}
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
    height: height,
    position: 'absolute',
    zIndex: -1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    zIndex: 1,
    paddingBottom: 50,
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
    zIndex: 2,
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
    zIndex: 2,
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
    zIndex: 2,
  },
  partImage: {
    width: 360,
    height: 390,
    marginBottom: 60,
    opacity: 0.5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    borderRadius: 20,
    zIndex: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomedImage: {
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: '20%',
    right: 20,
    zIndex: 3,
    backgroundColor: 'transparent',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  backText: {
    marginLeft: 5,
    color: 'rgb(14, 93, 8)',
    fontSize: 20,
  },
});

export default Merch;
