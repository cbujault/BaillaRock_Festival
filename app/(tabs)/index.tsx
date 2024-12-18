import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { Video } from 'expo-av';
import { Appearance } from 'react-native';
import { useRouter } from 'expo-router';
import { homeConfig } from '@/config/Config_HomePage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  Appearance.setColorScheme('dark');

  // Date du festival
  const festivalDate = new Date(homeConfig.festivalDate);
  const router = useRouter();

  // État du compte à rebours
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timeExpired, setTimeExpired] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Mise à jour du compte à rebours
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = festivalDate.getTime() - now.getTime();
  
      if (timeDifference <= 0) {
        setTimeExpired(true); // Cela met à jour `timeExpired`
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
        setTimeLeft({ days, hours, minutes, seconds }); // Cela met à jour `timeLeft`
      }
    };
  
    const interval = setInterval(updateCountdown, 1000);
  
    // Nettoyage de l'intervalle
    return () => clearInterval(interval);
  }, [festivalDate]); // Ajoutez seulement `festivalDate` comme dépendance si nécessaire
  

  // Récupérer la hauteur de l'écran
  const screenHeight = Dimensions.get('window').height;

  // Gestion du défilement
  const handleScroll = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const threshold = 500;
    const thresholdReturn = 0;

    if (contentOffsetY > threshold && !isScrolled) {
      setIsScrolled(true);
    } else if (contentOffsetY < thresholdReturn && isScrolled) {
      setIsScrolled(false);
    }
  };

  // Redirection vers une URL ou une page
  const navigateToExplore = () => {
    router.push('/(tabs)/explore');
  };

  // Rendu principal
  return (
    <ScrollView
    contentContainerStyle={styles.scrollContainer}
    onScroll={handleScroll}
    scrollEventThrottle={16}
  >
    <View style={[styles.imageContainer, { height: screenHeight }]}>
      {/* Affichage conditionnel avec les assets de la configuration */}
      {isScrolled ? (
        <Image
          source={homeConfig.assets.image} // Image depuis Config_HomePage
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      ) : (
        <Video
          source={homeConfig.assets.video} // Vidéo depuis Config_HomePage
          style={styles.backgroundVideo}
          resizeMode="cover"
          shouldPlay
          isLooping
          isMuted
        />
      )}

        <View style={styles.overlay}>
          <Text style={styles.TitleText}>{homeConfig.festivalName}</Text>
          {timeExpired ? (
            <>
              <Text style={styles.expiredText}>{homeConfig.messages.countdownExpired}</Text>
              <TouchableOpacity style={styles.button} onPress={navigateToExplore}>
                <Text style={styles.buttonText}>{homeConfig.messages.viewSchedule}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.countdownContainer}>
                <View style={styles.countdownRow}>
                  {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                    <View key={unit} style={styles.countdownItem}>
                      <Text style={styles.countdownNumber}>{timeLeft[unit]}</Text>
                      <Text style={styles.countdownLabel}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <Text style={styles.addressText}>{homeConfig.location}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openURL(homeConfig.socialMediaLinks.instagram)}
              >
                <Text style={styles.buttonText}>{homeConfig.messages.buyTickets}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <ThemedView style={styles.stepContainer}>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.subtitle}>Plan du site</ThemedText>
        </View>
        <Image
          source={homeConfig.assets.siteMap}
          style={styles.planImage}
          resizeMode="contain"
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.subtitle}>{homeConfig.messages.socialMediaTitle}</ThemedText>
        </View>
        <View style={styles.socialMediaIcons}>
          {Object.keys(homeConfig.socialMediaLinks).map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => Linking.openURL(homeConfig.socialMediaLinks[key as keyof typeof homeConfig.socialMediaLinks])}
            >
              <Image
                source={homeConfig.assets.socialIcons[key as keyof typeof homeConfig.assets.socialIcons]}
                style={styles.socialMediaIcon}
              />
            </TouchableOpacity>
          ))}
        </View>


        {/* Titre de la section */}
      <ThemedText type="title" style={styles.title}>
      </ThemedText>

      {/* Contenu descriptif */}
      <ThemedText style={styles.text}>
      </ThemedText>

      {/* Informations complémentaires */}
      <ThemedText style={styles.text}>
      </ThemedText>
      <ThemedText style={styles.text}>
      </ThemedText>

      <ThemedText style={styles.text}>
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
  // Style pour la vidéo en portrait
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Placer la vidéo en arrière-plan
  },
  // Style pour l'image en paysage
 backgroundImage: {
  position: 'absolute',
  bottom: 0, // Aligne l'image en bas de l'écran
  left: 0,
  width: '100%',
  height: undefined, // La hauteur est calculée automatiquement
  aspectRatio: 16 / 9, // Format paysage
  zIndex: -1, // Place l'image derrière les autres éléments
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
    justifyContent: 'center',
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

  locationText: {
    fontSize: 12,
    color: '#fff',
    marginVertical: 10, // Espacement au-dessus et en dessous
    fontStyle: 'italic',
    textAlign: 'center', // Centrer le texte
  },

 expiredText: {
  fontSize: 22,
  color: '#fff',
  marginVertical: 10, // Espacement au-dessus et en dessous
  fontWeight: 'bold',
  textAlign: 'center', // Centrer le texte
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

  planImage: {
    width: '170%',
    height: 200, // Ajustez la hauteur selon le contenu
    alignSelf: 'center',
    marginTop: 10, // Ajout d'un espace au-dessus de l'image
  },
  

  subtitle: {
    fontSize: 24, // Taille de police plus grande
    fontWeight: 'bold', // Gras pour un effet plus prononcé
    color: 'rgb(14, 93, 8)', // Couleur vive (exemple : orange)
    textAlign: 'center', // Centré horizontalement
    textTransform: 'uppercase', // Transforme le texte en majuscules
    marginBottom: 10, // Espacement en bas du titre
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // Ajout d'une ombre
    textShadowOffset: { width: 1, height: 1 }, // Décalage de l'ombre
    textShadowRadius: 2, // Flou de l'ombre
    fontFamily: 'Arial', // Police personnalisée (remplacez par votre choix si nécessaire)
  },
  

  titleContainer: {
    marginBottom: 20, // Ajouter un espace sous le titre
  },

  stepContainer: {
    flex: 1, // Prend tout l'espace disponible
    justifyContent: 'center', // Centre verticalement les enfants
    alignItems: 'center', // Centre horizontalement les enfants
    paddingHorizontal: 20, // Ajout de marges latérales pour ne pas coller aux bords
    paddingVertical: 30, // Ajouter un espace vertical
  },

  socialMediaContainer: {
    marginTop: 20, // Espacement au-dessus de la section
    marginBottom: 40, // Espacement en bas de la section
    alignItems: 'center', // Centre les éléments horizontalement
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fond légèrement sombre
    borderRadius: 10, // Coins arrondis
  },
  
  socialMediaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Texte blanc
    marginBottom: 10, // Espacement entre le titre et les icônes
  },
  
  socialMediaIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%', // Ajustez la largeur de la zone des icônes
  },
  
  socialMediaIcon: {
    width: 40,
    height: 40, // Taille des icônes
    marginHorizontal: 10, // Espacement entre les icônes
  },
  
  
  

  
});

