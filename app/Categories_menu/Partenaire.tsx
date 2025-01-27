import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PartModal from './popUp_Part';
import { Partenaires } from '../../data/PartenaireData';
import { backgroundImage } from '../../data/ExposantsData';

export type ListPartners = {
  id: string;
  name: string;
  genre: string;
  description: string;
  image: number;
  imageBG: number;
  socialLinks: { name: string; url: string }[];
};

export default function Partenaire() {
  const [selectedPart, setSelectedPart] = useState<ListPartners | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      title: 'Partenaires',
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="rgb(14, 93, 8)" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      ),
      headerShown: true,
    });
  }, [navigation, router]);

  const handlePartnerPress = (partner: ListPartners) => {
    setSelectedPart(partner);
    setModalVisible(true);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.screenContainer}>
        <FlatList
          data={Partenaires}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.partnerContainer} onPress={() => handlePartnerPress(item)}>
              <Image style={styles.partnerImage} source={item.image} resizeMode="contain" />
              <Text style={styles.partnerName}>{item.name || 'Nom inconnu'}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.emptyText}>Aucun partenaire disponible</Text>}
        />
        <PartModal visible={modalVisible} onClose={() => setModalVisible(false)} part={selectedPart} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 8,
    paddingTop: 70,
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
    width: 120,
    height: 120,
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
    color: 'rgb(14, 93, 8)',
    fontSize: 20,
  },
});