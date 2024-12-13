import { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  // Date du festival (23 mai 2025)
  const festivalDate = new Date('2025-05-23T00:00:00');

  // Etat du compte à rebours
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Mise à jour du compte à rebours chaque seconde
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = festivalDate - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/Dragon.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">BAILLAROCK FESTIVAL</ThemedText>
        <HelloWave />
      </ThemedView>

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
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countdownContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  countdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  countdownItem: {
    alignItems: 'center',
  },
  countdownNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#28a745', // Changer la couleur en vert
  },
  countdownLabel: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#555',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
