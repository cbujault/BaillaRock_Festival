import { ListFood } from '../app/(tabs)/village'; 

export const Food: ListFood[] = [
  {
    id: '1',
    name: 'NESS & NONO Traiteur',
    genre: '#Brasero',
    description: 'Traiteurs pour professionnels ou particulier, repas de famille, pour entreprise, anniversaire et mariage. \nFaites-nous confiance pour faire de votre événement un moment mémorable !',
    image: require('../assets/images/Logo_FoodT/Logo_nessno.png'),
  },
  {
    id: '2',
    name: 'La cuisine de comptoir',
    genre: 'Restaurant français - Poitiers \nFinaliste 🏆 Coupe de France du Burger Sud O 2020-2021-2022-2023-2024',
    description: 'Depuis plusieurs années la cuisine de comptoir vous offre une cuisine simple, élaborée à partir de produits frais et locaux, du burger artisanal à la côte de bœuf racée sélectionnée par notre boucher Laurent Point, de nos bières artisanales à nos vins sélectionnée par notre sommelier, nous travaillons avec plus d une vingtaine de producteurs locaux ! \nTout est fait ici pour créer un endroit convivial, autour de vrais produits d artisans, une cuisine aux gouts de tous, que vous soyez végétarien, amateur de belles viandes; de poissons fins ou de burgers bien fait ! \nVive le Fait Maison !',
    image: require('../assets/images/Logo_FoodT/logo_cuisinecomptoir.png'),
  },
];
