import { useState, useEffect } from 'react';
import { StyleSheet, Platform, View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av'; // Importez Video de expo-av
import { Linking } from 'react-native'; // Importez Linking pour la redirection vers une URL
import { Appearance } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {

  Appearance.setColorScheme('dark');
  // Date du festival (23 mai 2025)
  const festivalDate = new Date('2025-05-23T00:00:00');

  // Etat du compte à rebours
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Mise à jour du compte à rebours chaque seconde
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = festivalDate - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Récupérer la hauteur de l'écran
  const screenHeight = Dimensions.get('window').height;

  // Fonction pour ouvrir un site web
  const openWebsite = () => {
    Linking.openURL('https://www.instagram.com/baillarock_unitedwefest/'); // Remplacez 'http://xxxxx' par l'URL souhaitée
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.imageContainer, { height: screenHeight }]}>
        {/* Utilisez le composant Video d'Expo */}
        <Video
          source={require('@/assets/videos/videohomepage.mp4')} // Remplacez avec votre propre fichier vidéo
          style={styles.backgroundVideo}
          resizeMode="cover" // Recouvre l'ensemble de l'écran
          shouldPlay // Commence la lecture
          isLooping // Répète la vidéo en boucle
          isMuted // Vidéo sans son
        />
        {/* Texte et compte à rebours au-dessus de la vidéo */}
        <View style={styles.overlay}>
          {/* Texte du festival ajouté */}
          <Text style={styles.TitleText}>BAILLAROCK FESTIVAL</Text>
          
          {/* Affichage du compte à rebours */}
          <View style={styles.countdownContainer}>
            <View style={styles.countdownRow}>
              <View style={styles.countdownItem}>
                <Text style={styles.countdownNumber}>{timeLeft.days}</Text>
                <Text style={styles.countdownLabel}>Jours</Text>
              </View>
              <View style={styles.countdownItem}>
                <Text style={styles.countdownNumber}>{timeLeft.hours}</Text>
                <Text style={styles.countdownLabel}>Heures</Text>
              </View>
              <View style={styles.countdownItem}>
                <Text style={styles.countdownNumber}>{timeLeft.minutes}</Text>
                <Text style={styles.countdownLabel}>Minutes</Text>
              </View>
              <View style={styles.countdownItem}>
                <Text style={styles.countdownNumber}>{timeLeft.seconds}</Text>
                <Text style={styles.countdownLabel}>Secondes</Text>
              </View>
            </View>
          </View>
          
          {/* Adresse en italique, au-dessus du bouton */}
          <Text style={styles.addressText}>Saint Georges Les Baillargeaux</Text>

          {/* Le bouton en bas du compteur */}
          <TouchableOpacity style={styles.button} onPress={openWebsite}>
            <Text style={styles.buttonText}>Achetez vos billets !</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Etapes d'instructions */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Conteneur global pour le défilement
  scrollContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Placer la vidéo en arrière-plan
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fond sombre pour assombrir la vidéo
    paddingBottom: 50, // Espacement pour ne pas que le bouton soit collé
  },
  
  TitleText: {
    fontSize: 35, // Taille du texte
    fontWeight: 'bold', // Gras
    color: 'white', // Couleur blanche
    marginBottom: 20, // Espacement entre le texte et le compteur
    justifyContent : 'center',
    alignContent: 'center',
  },

  countdownContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  countdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  countdownItem: {
    alignItems: 'center',
  },
  countdownNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff', // Couleur blanche pour le texte
  },
  countdownLabel: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#ddd', // Couleur douce pour les labels
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Couleur du bouton
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3, // Ombre pour le bouton
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Nouveau style pour l'adresse en italique et au-dessus du bouton
  addressText: {
    fontSize: 12, // Taille de police petite
    fontStyle: 'italic', // Texte en italique
    color: '#fff', // Couleur blanche
    marginBottom: 10, // Espacement au-dessus du bouton
    textAlign: 'center', // Centrer le texte
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
