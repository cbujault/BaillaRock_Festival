import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font'; // Pour charger les polices
import { useNavigation } from '@react-navigation/native'; // Import de useNavigation

export default function Prevention() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation(); // Hook de navigation de React Navigation

  // Charger les polices
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Capsmall_clean': require('../../assets/fonts/Capsmall_clean.ttf'), // Assurez-vous que le chemin est correct
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
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Utilise goBack() à la place de router.back()
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="rgb(14, 93, 8)" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      ),
      headerShown: true, // Afficher l'en-tête
    });
  }, [navigation]); // On applique ces options lorsque `navigation` change

  if (!fontLoaded) {
    return null; // Afficher un loader si la police n'est pas encore chargée
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>
        À la Safe Place, tu trouveras :{"\n\n"}
        - Un lieu d'échange convivial.{"\n"}
        - Des informations sur la prévention des risques.{"\n"}
        - Des animations et de l'écoute.{"\n"}
        - Un abri au besoin.{"\n\n"}
        Nous proposons également des bouchons d'oreilles, des préservatifs et bien d'autres choses.{"\n\n"}
        Passe nous voir !
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'left',
    marginTop: 50,
    lineHeight: 28,
    fontFamily: 'Capsmall_clean', // Appliquer la police personnalisée
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
