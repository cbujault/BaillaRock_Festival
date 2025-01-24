import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font';  // Importer le module expo-font

export default function Prevention() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Charger la police
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Capsmall': require('../../assets/fonts/Capsmall.ttf'), // Spécifie le chemin de ta police
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // Optionnel : Tu peux afficher un loader ici pendant le chargement des polices
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>
        A la Safe Place, tu trouveras :{"\n\n"}
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
    backgroundColor: '#000000', // Fond vert foncé
    padding: 16,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'left',
    marginTop: 50,
    lineHeight: 28,
    fontFamily: 'Capsmall', // Applique ta police personnalisée ici
  },
});
