import { ListFood } from '../app/(tabs)/village';

export const Food: ListFood[] = [
  {
    id: '1',
    name: 'NESS & NONO Traiteur',
    genre: '#Brasero',
    description: 'Traiteurs pour professionnels ou particulier, repas de famille, pour une entreprise, un anniversaire ou un mariage.\nFaites-nous confiance pour faire de votre événement un moment mémorable !',
    image: require('../assets/images/Logo_FoodT/Logo_nessno.png'),
    imageBG: require('../assets/images/Logo_FoodT/bg_ness_no.png'),
    socialLinks: [
      { name: "facebook", url: "https://www.facebook.com/nessetnono" },
      { name: "instagram", url: "https://www.instagram.com/nessetnono/" },
      { name: "website", url: "https://www.ness-et-nono-traiteur.com/" },
    ],
  },
  {
    id: '2',
    name: 'La cuisine de comptoir',
    genre: 'Restaurant français - Poitiers',
    description: '\nFinaliste 🏆 : \n\n\tCoupe de France du Burger Sud : 2020 - 2021 - 2022 - 2023 - 2024\n\nDepuis plusieurs années la cuisine de comptoir vous offre une cuisine simple, élaborée à partir de produits frais et locaux.\nTout est fait ici pour créer un endroit convivial, autour de vrais produits d’artisans, une cuisine aux goûts de tous, que vous soyez végétarien, amateur de belles viandes, de poissons fins ou de burgers bien faits ! Vive le Fait Maison !',
    image: require('../assets/images/Logo_FoodT/logo_cuisinecomptoir.png'),
    imageBG: require('../assets/images/Logo_FoodT/bg_ness_no.png'),
    socialLinks: [
      { name: "facebook", url: "https://www.facebook.com/lacuisinedecomptoir" },
      { name: "instagram", url: "https://www.instagram.com/lacuisinedecomptoir86/" },
      { name: "website", url: "http://www.la-cuisine-de-comptoir.eatbu.com/" },
    ],
  },
];
