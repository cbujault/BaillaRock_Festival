import React, { useState} from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import PartModal from '../popUp_Part'; 
import { Partenaires } from '../../data/PartenaireData';

const { width, height } = Dimensions.get('window');

// Définir le type pour un partenaire
export type ListPartners = {
  id: string; // Identifiant unique
  name: string; // Nom du partenaire
  genre: string; // Genre du partenaire
  image: string; // URL de l'image du partenaire
  description: string; // Description du partenaire
};

export default function Partenaire() {
  const [selectedPart, setSelectedPart] = useState<ListPartners | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePartnerPress = (partner: ListPartners) => {
    setSelectedPart(partner);
    setModalVisible(true);
  };

  const renderPartner = ({ item }: { item: ListPartners }) => (
    <TouchableOpacity style={styles.partnerContainer} onPress={() => handlePartnerPress(item)}>
      <Image style={styles.partnerImage} source={{ uri: item.image }} resizeMode="contain" />
      <Text style={styles.partnerName}>{item.name || 'Nom inconnu'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={Partenaires}
        keyExtractor={(item) => item.id}
        renderItem={renderPartner}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Aucun partenaire disponible
          </Text>
        }
      />
      <PartModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        part={selectedPart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 8,
  },
  listContent: {
    paddingBottom: 16,
    justifyContent: 'center',
  },
  partnerContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: '#444',
    borderRadius: 8,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  partnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#fff',
    textAlign: 'center',
  },
  partnerImage: {
    width: width / 2 - 48,
    height: width / 2 - 48,
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});
