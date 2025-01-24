import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook pour la navigation
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Hook pour la navigation entre les pages
import PartModal from './popUp_Part';
import { Partenaires } from '../../data/PartenaireData';

const { width } = Dimensions.get('window');

// Type pour un partenaire
export type ListPartners = {
  id: string;
  name: string;
  genre: string;
  description: string;
  image: number;
};

export default function Partenaire() {
  const [selectedPart, setSelectedPart] = useState<ListPartners | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); // Hook pour la navigation
  const router = useRouter(); // Hook pour la navigation entre les pages

  // Charger et personnaliser l'en-tête dans useEffect
  useEffect(() => {
    navigation.setOptions({
      title: 'Partenaires', // Titre de l'écran
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="'rgb(14, 93, 8)'" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      ),
      headerShown: true, // Afficher l'en-tête
    });
  }, [navigation, router]);

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
    justifyContent: 'center',
  },
  partnerName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#fff',
    textAlign: 'center',
  },
  partnerImage: {
    width: width / 2 - 64,
    height: width / 3 - 64,
    marginBottom: 8,
    borderRadius: 10,
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  backText: {
    marginLeft: 5,
    color: 'black',
    fontSize: 16,
  },
});
