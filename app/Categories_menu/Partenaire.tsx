import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import PartModal from './popUp_Part'; 
import { Partenaires } from '../../data/PartenaireData';

const { width } = Dimensions.get('window');

// Type pour un partenaire
export type ListPartners = {
  id: string; // Identifiant unique
  name: string; // Nom du partenaire
  genre: string; // Genre du partenaire
  description: string; // Description du partenaire
  image: number; // Représente une ressource d'image importée via require
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
      <Image style={styles.partnerImage} source={item.image} resizeMode="contain" />
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
        part={selectedPart} // Corrigé pour être compatible
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
    justifyContent: 'center', // Centrer l'image et le texte
  },
  partnerName: {
    fontSize: 14, // Légèrement réduit pour éviter les chevauchements
    fontWeight: 'bold',
    marginTop: 8,
    color: '#fff',
    textAlign: 'center',
  },
  partnerImage: {
    width: width / 2 - 64, // Ajustement pour un espacement propre
    height: width / 3 - 64, // Proportionnelle pour éviter des déformations
    marginBottom: 8, // Espacement entre l'image et le texte
    borderRadius: 10, // Coins arrondis pour un meilleur design
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});
