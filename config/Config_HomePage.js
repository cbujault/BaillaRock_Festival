// Import des fichiers multimédias statiques
import video from '@/assets/videos/videohomepage.mp4';
import image from '@/assets/images/Dragon.png';
import siteMap from '@/assets/images/Plan_baillarock.png';
import instagramIcon from '@/assets/images/Icon_reseau/instagram.png';
import facebookIcon from '@/assets/images/Icon_reseau/facebook.png';
import youtubeIcon from '@/assets/images/Icon_reseau/youtube.png';
import websiteIcon from '@/assets/images/Icon_reseau/web-link.png';

// Configuration de la page d'accueil
export const homeConfig = {
  festivalName: "BAILLAROCK FESTIVAL",
  festivalDate: "2025-05-23T18:00:00",
  location: "Saint Georges Les Baillargeaux",
  socialMediaLinks: {
    instagram: "https://www.instagram.com/baillarock_unitedwefest/",
    facebook: "https://www.facebook.com/",
    youtube: "https://www.youtube.com/",
    website: "https://www.baillarockfestival.fr/"
  },
  assets: {
    video, // Fichier vidéo
    image, // Image de fond
    siteMap, // Plan du site
    socialIcons: {
      instagram: instagramIcon, // Icône Instagram
      facebook: facebookIcon,   // Icône Facebook
      youtube: youtubeIcon,     // Icône YouTube
      website: websiteIcon,     // Icône du site web
    }
  },
  messages: {
    countdownExpired: "C'est maintenant !",
    buyTickets: "Achetez vos billets !",
    viewSchedule: "Voir la programmation",
    socialMediaTitle: "Suivez-nous sur les réseaux sociaux",
  }
};
