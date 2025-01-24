import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Menu = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Merch" onPress={() => router.push('/Categories_menu/Merch')} />
      <Button title="Partenaire" onPress={() => router.push('/Categories_menu/Partenaire')} />
      <Button title="Prevention" onPress={() => router.push('/Categories_menu/Prevention')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Menu;
