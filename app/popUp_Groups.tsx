import * as React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Pour les icônes des réseaux sociaux
import { ImageSourcePropType } from 'react-native';

type Group = {
  name: string;
  genre: string;
  image: ImageSourcePropType;
  description: string;
};

export type GroupModalProps = {
  visible: boolean;
  onClose: () => void;
  group: Group | null;
};


export default function GroupModal({ visible, onClose, group }: GroupModalProps) {
  if (!group) return null;

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        {/* Icône de fermeture en haut à droite */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <FontAwesome name="times" size={30} color="green" />
        </TouchableOpacity>
        <View style={styles.banner}>
          <View style={styles.textContainer}>
            <Text style={styles.groupName}>{group.name}</Text>
            <Text style={styles.groupGenre}>{group.genre}</Text>
          </View>
          <Image source={group.image} style={styles.groupImage} />
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
    color: 'white',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
