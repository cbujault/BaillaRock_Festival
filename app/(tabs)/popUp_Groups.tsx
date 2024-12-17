import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Pour les icônes des réseaux sociaux
import {Group} from './explore';

type GroupModalProps = {
  visible: boolean;
  onClose: () => void;
  group: Group | null;
};


export default function GroupModal({ visible, onClose, group }: GroupModalProps) {
  if (!group) return null;

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.banner}>
          <View style={styles.textContainer}>
            <Text style={styles.groupName}>{group.name}</Text>
            <Text style={styles.groupGenre}>{group.genre}</Text>
          </View>
          <Image source={{ uri: group.image }} style={styles.groupImage} />
        </View>
        <View style={styles.content}>
          <Text style={styles.description}>{group.description}</Text>
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
    backgroundColor: 'white',
  },
  banner: {
    height: '25%',
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    flex: 1,
  },
  groupName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  groupGenre: {
    fontSize: 18,
    color: 'gray',
  },
  groupImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
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
  },
  closeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
