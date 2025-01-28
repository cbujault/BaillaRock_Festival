import { ListExpo } from '../app/(tabs)/village';

export const Exposants: ListExpo[] = [
  {
    id: '1',
    name: 'La Minute Blonde',
    genre: 'Bar',
    description: 'Description bar',
    image: require('../assets/images/Logo_Part/SaintG.png'),
    imageBG: require('../assets/images/Logo_FoodT/bg_ness_no.png'),
    socialLinks: [ 
      { name: 'facebook', url: 'https://www.facebook.com/laminuteblonde' },
      { name: 'instagram', url: 'https://www.instagram.com/laminuteblonde' },
    ],
  },
  {
    id: '2',
    name: 'Exposant 2',
    genre: 'Genre',
    description: 'Description',
    image: require('../assets/images/Logo_Part/SaintG.png'),
    imageBG: require('../assets/images/Logo_FoodT/bg_ness_no.png'),
    socialLinks: [
      { name: 'facebook', url: 'https://www.facebook.com/laminuteblonde' },
      { name: 'instagram', url: 'https://www.instagram.com/laminuteblonde' },
    ],
  },
  {
    id: '3',
    name: 'Exposant 3',
    genre: 'Genre',
    description: 'Description',
    image: require('../assets/images/Logo_Part/SaintG.png'),
    imageBG: require('../assets/images/Logo_FoodT/bg_ness_no.png'),
    socialLinks: [
      { name: 'facebook', url: 'https://www.facebook.com/laminuteblonde' },
      { name: 'instagram', url: 'https://www.instagram.com/laminuteblonde' },
    ],
  },
  {
    id: '4',
    name: 'Exposant 4',
    genre: 'Genre',
    description: 'Description',
    image: require('../assets/images/Logo_Part/SaintG.png'),
    imageBG: require('../assets/images/Logo_FoodT/bg_ness_no.png'),
    socialLinks: [
      { name: 'facebook', url: 'https://www.facebook.com/laminuteblonde' },
      { name: 'instagram', url: 'https://www.instagram.com/laminuteblonde' },
    ],
  },
];

// Image de fond à l'extérieur, globale au fichier Exposants
export const backgroundImage = require('../assets/images/Merch/Affiche_drag.png');
