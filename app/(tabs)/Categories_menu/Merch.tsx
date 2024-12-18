import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedView, ThemedText } from './YourThemedComponents'; // Remplacez par l'import correct

export default function Merch() {
  return (
    <View>
      <Text>Merch Screen</Text>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    padding: 16,
    backgroundColor: '#f8f9fa', // Exemple de style, ajustez selon vos besoins
    borderRadius: 8,
    marginTop: 16,
  },
});
