import * as React from 'react';
import { Modal, View, Text, ImageBackground, StyleSheet, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Group, SocialLink } from './(tabs)/Programmation';

export type GroupModalProps = {
  visible: boolean;
  onClose: () => void;
  group: Group | null;
};

// Définir une map des icônes pour les réseaux sociaux
const socialIconMap: { [key: string]: string } = {
  facebook: "facebook",
  twitter: "twitter",
  instagram: "instagram",
  youtube: "youtube",
  linkedin: "linkedin",
};

// Fonction pour récupérer l'icône d'un réseau social
const getSocialIcon = (name: string): string => {
  return socialIconMap[name] || "link"; // Icône générique pour les liens non mappés
};

export default function GroupModal({ visible, onClose, group }: GroupModalProps) {
  if (!group) return null;

  // Fonction pour ouvrir un lien
  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      alert("Impossible d'ouvrir le lien.");
    });
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        {/* Icône de fermeture */}
        <SafeAreaView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome name="times" size={30} color="green" />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Bannière avec image de fond */}
        <View style={styles.banner}>
          <ImageBackground source={group.bannerImage} style={styles.bannerBackground} resizeMode="cover">
            <View style={styles.textContainer}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupGenre}>{group.genre}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>{group.description}</Text>

          {/* Icônes des réseaux sociaux dynamiques */}
          <View style={styles.socialIcons}>
            {group.socialLinks.map((social, index) => (
              <TouchableOpacity key={index} onPress={() => openLink(social.url)}>
                <FontAwesome 
                  name={getSocialIcon(social.name)} 
                  size={30} 
                  color="#fff" 
                  style={styles.socialIcon} 
                />
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
  },
  banner: {
    height: '30%',
  },
  bannerBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'flex-start',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  groupName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  groupGenre: {
    fontSize: 17,
    color: 'lightgray',
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
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
  },
});
