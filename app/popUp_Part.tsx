import * as React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Pour les icônes des réseaux sociaux

// Type pour un partenaire
type Part = {
  name: string;
  genre: string;
  image: string;
  description: string;
};

// Propriétés du modal
export type PartModalProps = {
  visible: boolean;
  onClose: () => void;
  part: Part | null; // Remplacez "group" par "part" pour correspondre à la terminologie
};

export default function PartModal({ visible, onClose, part }: PartModalProps) {
  if (!part) return null;

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.banner}>
          <View style={styles.textContainer}>
            <Text style={styles.partName}>{part.name}</Text>
            <Text style={styles.partGenre}>{part.genre}</Text>
          </View>
          <Image source={{ uri: part.image }} style={styles.partImage} />
        </View>
        <View style={styles.content}>
          <Text style={styles.description}>{part.description}</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity>
              <FontAwesome name="facebook" size={30} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="twitter" size={30} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="instagram" size={30} color="#E1306C" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgb(40, 40, 40)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: '25%',
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  partName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  partGenre: {
    fontSize: 18,
    color: 'gray',
  },
  partImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    textAlign: 'justify',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  closeButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  closeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
