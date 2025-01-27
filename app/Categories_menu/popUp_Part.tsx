import * as React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export type Part = {
  name: string;
  genre: string;
  imageBG: any;
  description: string;
  socialLinks: { name: string; url: string }[];
};

export type PartModalProps = {
  visible: boolean;
  onClose: () => void;
  part: Part | null;
};

const socialIconMap: { [key: string]: keyof typeof FontAwesome.glyphMap } = {
  facebook: 'facebook',
  instagram: 'instagram',
  website: 'link',
};

const getSocialIcon = (name: string): keyof typeof FontAwesome.glyphMap => {
  return socialIconMap[name] || 'link';
};

export default function PartModal({ visible, onClose, part }: PartModalProps) {
  if (!part) return null;

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      alert('Impossible d\'ouvrir le lien.');
    });
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <SafeAreaView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome name="times" size={30} color="green" />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.banner}>
          <ImageBackground source={part.imageBG} style={styles.bannerBackground} resizeMode="cover">
            <View style={styles.textContainer}>
              <Text style={styles.partName}>{part.name}</Text>
              <Text style={styles.partGenre}>{part.genre}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>{part.description}</Text>
          <View style={styles.socialIcons}>
            {part.socialLinks.map((social, index) => (
              <TouchableOpacity key={index} onPress={() => openLink(social.url)}>
                <FontAwesome name={getSocialIcon(social.name)} size={30} color="#fff" style={styles.socialIcon} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgb(40, 40, 40)',
    position: 'relative',
  },
  banner: {
    height: '30%',
    position: 'relative',
  },
  bannerBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignSelf: 'flex-start',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  partName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  partGenre: {
    fontSize: 18,
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
    textAlign: 'justify',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
});
