// app/Menu.tsx
import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Menu() {
  const router = useRouter();

  // Fonction pour naviguer vers Merch
  const handleNavigateToMerch = () => {
    router.push('./Categories_menu/Merch');
  };

  // Fonction pour naviguer vers Partenaires
  const handleNavigateToPartenaires = () => {
    router.push('./Categories_menu/Partenaire');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Content</Text>
      <Button title="Go to Merch" onPress={handleNavigateToMerch} />
      <Button title="Go to Partenaires" onPress={handleNavigateToPartenaires} />
    </View>
  );
}

// StyleSheet pour améliorer l'apparence
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
