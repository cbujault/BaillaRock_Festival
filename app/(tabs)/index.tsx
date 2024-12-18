import { useState, useEffect } from 'react';
import { StyleSheet, Platform, View, Text, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Video } from 'expo-av'; // Importez Video de expo-av
import { Linking } from 'react-native'; // Importez Linking pour la redirection vers une URL
import { Appearance } from 'react-native';
import { useRouter } from 'expo-router'; 

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {

  Appearance.setColorScheme('dark');
  // Date du festival (23 mai 2025)
  const festivalDate = new Date('2025-05-23T18:00:00');
  const router = useRouter(); // Hook pour la navigation


  // Etat du compte à rebours
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timeExpired, setTimeExpired] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Nouvel état pour savoir si l'utilisateur a défilé

  // Mise à jour du compte à rebours chaque seconde
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = festivalDate - now;
    
      if (timeDifference <= 0) {
        setTimeExpired(true);
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    
  
    updateCountdown(); // Mise à jour initiale
    const interval = setInterval(updateCountdown, 1000);
  
    return () => clearInterval(interval);
  }, []);
  

  // Récupérer la hauteur de l'écran
  const screenHeight = Dimensions.get('window').height;

  // Fonction pour ouvrir un site web
  const openWebsite = () => {
    Linking.openURL('https://www.instagram.com/baillarock_unitedwefest/'); // Remplacez 'http://xxxxx' par l'URL souhaitée
  };

  const navigateToExplore = () => {
    router.push('/(tabs)/explore'); // Redirige vers l'onglet Explore
  };

  // Fonction pour gérer le défilement avec des seuils asymétriques
    const handleScroll = (event) => {
      const contentOffsetY = event.nativeEvent.contentOffset.y;
      
      const threshold = 500; // Seuil pour passer à l'image
      const thresholdReturn = 0; // Seuil pour revenir à la vidéo
      
      // Vérification si on descend assez pour passer à l'image
      if (contentOffsetY > threshold && !isScrolled) {
        setIsScrolled(true);
      } 
      // Vérification si on remonte au-dessus du seuil pour revenir à la vidéo
      else if (contentOffsetY < thresholdReturn && isScrolled) {
        setIsScrolled(false);
      }
    };
    
  
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer} onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={[styles.imageContainer, { height: screenHeight }]}>
          {/* Afficher la vidéo ou l'image en fonction de l'état isScrolled */}
          {isScrolled ? (
            <Image
              source={require('@/assets/images/Dragon.png')} // Remplacez par votre image
              style={styles.backgroundImage}
              resizeMode="cover"
            />
          ) : (
            <Video
              source={require('@/assets/videos/videohomepage.mp4')} // Remplacez avec votre propre fichier vidéo
              style={styles.backgroundVideo}
              resizeMode="cover" // Recouvre l'ensemble de l'écran
              shouldPlay // Commence la lecture
              isLooping // Répète la vidéo en boucle
              isMuted // Vidéo sans son
            />
          )}
          
          {/* Texte et compte à rebours au-dessus de la vidéo ou de l'image */}
          <View style={styles.overlay}>
            {/* Texte du festival ajouté */}
            <Text style={styles.TitleText}>BAILLAROCK FESTIVAL</Text>
            
            {/* Affichage dynamique */}
            {timeExpired ? (
              <>
                {/* Texte lorsque le temps est écoulé */}
                <Text style={styles.expiredText}>C'est maintenant !</Text>
                {/* Bouton Voir la programmation */}
                <TouchableOpacity style={styles.button} onPress={navigateToExplore}>
                  <Text style={styles.buttonText}>Voir la programmation</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
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
    
                {/* Bouton Acheter les billets */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => Linking.openURL('https://www.instagram.com/baillarock_unitedwefest/')}
                >
                  <Text style={styles.buttonText}>Achetez vos billets !</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

      {/* Plan du site */}
      <ThemedView style={styles.stepContainer}>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.subtitle}>Plan du site</ThemedText>
        </View>
        <Image
          source={require('@/assets/images/Plan_baillarock.png')} // Remplacez par le chemin de votre image du plan
          style={styles.planImage} // Style pour l'image
          resizeMode="contain" // Ajustement pour conserver les proportions
        />
      </ThemedView>



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
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">COMMMMMMME ON</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>


      <View style={styles.socialMediaContainer}>
      <Text style={styles.socialMediaTitle}>Suivez-nous sur les réseaux sociaux</Text>
      <View style={styles.socialMediaIcons}>
        <TouchableOpacity onPress={() => Linking.openURL('@/assets/icon_reseau/instagram.png')}>
          <Image
            source={require('@/assets/icons/instagram.png')} // Ajoutez une icône Instagram dans vos assets
            style={styles.socialMediaIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('@/assets/icon_reseau/facebook.png')}>
          <Image
            source={require('@/assets/icons/facebook.png')} // Ajoutez une icône Facebook dans vos assets
            style={styles.socialMediaIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/')}>
          <Image
            source={require('@/assets/icon_reseau/youtube.png')} // Ajoutez une icône LinkedIn dans vos assets
            style={styles.socialMediaIcon}
          />
        </TouchableOpacity>
      </View>
    </View>

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

