import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Pour la navigation entre les pages
import * as Font from 'expo-font'; // Pour charger les polices
import { useNavigation } from '@react-navigation/native'; // Import de useNavigation

export default function Prevention() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const router = useRouter(); // Hook pour la navigation entre les pages
  const navigation = useNavigation(); // Hook de navigation de React Navigation

  // Charger les polices
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Capsmall': require('../../assets/fonts/Capsmall.ttf'), // Assurez-vous que le chemin est correct
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);

  // Personnaliser l'en-tête lorsque le composant est monté
  useEffect(() => {
    navigation.setOptions({
      title: 'Prévention', // Titre personnalisé
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="'rgb(14, 93, 8)'" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      ),
      headerShown: true, // Afficher l'en-tête
    });
  }, [navigation, router]); // On applique ces options lorsque `navigation` et `router` changent

  if (!fontLoaded) {
    return null; // Afficher un loader si la police n'est pas encore chargée
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>
        La Safe Place offre des ressources pour la prévention des risques.{"\n\n"}
        Nous avons des bouchons d'oreilles, des préservatifs et d'autres fournitures.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'left',
    marginTop: 50,
    lineHeight: 28,
    fontFamily: 'Capsmall', // Appliquer la police personnalisée
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
