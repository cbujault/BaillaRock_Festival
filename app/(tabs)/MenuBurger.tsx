import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Menu = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/Categories_menu/Merch')}
      >
        <Ionicons name="shirt-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Merch</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/Categories_menu/Partenaire')}
      >
        <Ionicons name="people-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Partenaire</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/Categories_menu/Prevention')}
      >
        <Ionicons name="shield-checkmark-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Prévention</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fond noir élégant
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row', // Icône + texte côte à côte
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#005F37', // Vert foncé
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Menu;
