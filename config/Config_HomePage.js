// Import des fichiers multimédias statiques
import video from '@/assets/videos/videohomepage.mp4';
import image from '@/assets/images/Dragon.png';
import siteMap from '@/assets/images/Plan_baillarock.png';


// Localisation de la salle
const openMaps = () => {
  const address = encodeURIComponent("Route du Stade, Saint George les Baillargeaux France");
  const url = Platform.select({
    ios: `maps:0,0?q=${address}`, // Apple Maps
    android: `geo:0,0?q=${address}` // Google Maps
  });

  if (url) {
    Linking.openURL(url).catch(() =>
      Alert.alert("Erreur", "Impossible d'ouvrir l'application de navigation.")
    );
  }
};



// Configuration de la page d'accueil
export const homeConfig = {
  festivalName: "BAILLAROCK FESTIVAL",
  festivalDate: "2025-05-23T18:00:00",
  mapsLocalisation: "Route du Stade, Saint Georges Les Baillargeaux, France",
  location: "Saint Georges Les Baillargeaux",
  socialMediaLinks: {
    shop : "https://my.weezevent.com/BaillarockFestival2025",
    instagram: "https://www.instagram.com/baillarock_unitedwefest/",
    facebook: "https://www.facebook.com/UnitedWeFest/",
    youtube: "https://www.youtube.com/channel/UCUzh0r_ru-REV_5OFLzamAw",
    website: "https://www.baillarockfestival.fr/"
  },
  assets: {
    video, // Fichier vidéo de la page d'accueil
    image, // Image de fond lorsque l'on fait glisser vers le bas pour cacher la vidéo
    siteMap, // Plan du site
    socialIcons: {
      instagram: { 
        icon: "instagram", 
        iconType: "FontAwesome", 
        color: 'rgba(132, 132, 132, 0.7)'
      }, 
      facebook: { 
        icon: "facebook", 
        iconType: "FontAwesome", 
        color: 'rgba(132, 132, 132, 0.7)' 
      },    
      youtube: { 
        icon: "youtube", 
        iconType: "FontAwesome", 
        color: 'rgba(132, 132, 132, 0.7)' 
      },       
      website: { 
        icon: "web", 
        iconType: "MaterialIcons", 
        color: 'rgba(132, 132, 132, 0.7)' 
      },       
    }
  },
  messages: {
    countdownExpired: "C'est maintenant !",
    buyTickets: "Achetez vos billets !",
    viewSchedule: "Voir la programmation",
    socialMediaTitle: "Suivez-nous sur les réseaux sociaux",
  }
};
