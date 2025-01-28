import React, { useState, useEffect } from 'react';
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
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import MerchConfig from '../../config/Config_Merch';
import { Ionicons } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-pan-zoom';

const { width, height } = Dimensions.get('window');

const Merch: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      title: 'Merchandising',
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="#0E5D08" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      ),
      headerShown: true,
    });
  }, [navigation, router]);

  const handleImagePress = (image: any) => {
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
          {selectedImage && (
            <ImageZoom
              cropWidth={width}
              cropHeight={height}
              imageWidth={width * 0.9}
              imageHeight={width * 0.9}
            >
              <Image source={selectedImage} style={styles.zoomedImage} />
            </ImageZoom>
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
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
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
    color: '#0E5D08',
    fontSize: 20,
  },
});

export default Merch;
