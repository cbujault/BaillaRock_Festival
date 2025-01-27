import * as React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ImageSourcePropType } from 'react-native';
import { Linking } from 'react-native';

export type Expo = {
  name: string;
  genre: string;
  image: ImageSourcePropType;
  description: string;
  facebookLink?: string;
  instagramLink?: string;
  websiteLink?: string;
};

export type ExpoModalProps = {
  visible: boolean;
  onClose: () => void;
  expo: Expo | null;
};

export default function ExpoModal({ visible, onClose, expo }: ExpoModalProps) {
  if (!expo) return null;

  const handleOpenLink = async (url?: string) => {
    if (url) {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        Linking.openURL(url);
      } else {
        console.warn('Ce lien n\'est pas supporté :', url);
      }
    } else {
      console.warn('Aucun lien disponible.');
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.banner}>
          <View style={styles.textContainer}>
            <Text style={styles.expoName}>{expo.name}</Text>
            <Text style={styles.expoGenre}>{expo.genre}</Text>
          </View>
          <Image source={expo.image} style={styles.expoImage} resizeMode="contain" />
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>{expo.description}</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleOpenLink(expo.facebookLink)}
            >
              <FontAwesome name="facebook" size={40} color="#3b5998" />
            </TouchableOpacity>
            {expo.instagramLink && (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleOpenLink(expo.instagramLink)}
              >
                <FontAwesome name="instagram" size={40} color="#E1306C" />
              </TouchableOpacity>
            )}
            {expo.websiteLink && (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleOpenLink(expo.websiteLink)}
              >
                {/* Icône simple pour le web */}
                <FontAwesome name="globe" size={40} color="#000" />
              </TouchableOpacity>
            )}
          </View>
        </View>

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
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
    width: 130,
    height: 120,
    borderRadius: 30,
    marginLeft: -60,
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
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  iconButton: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 15,
    zIndex: 40,
  },
});
