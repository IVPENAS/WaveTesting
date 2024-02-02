import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Audio } from 'expo-av';
import SimpleWaveform from './components/SimpleWaveform';

const samples = [0.5, 0.8, 0.3, 0.6, 0.7, 0.2, 0.9, 0.1, 1.5]; // Example waveform data


export default function App() {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/sample.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); 
    setIsPlaying(true);

    // When playback finishes
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        // Release the audio player resource
        sound.unloadAsync();
        setIsPlaying(false);
      }
    });
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); 
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title={isPlaying ? "Pause" : "Play"} onPress={() => {
        if (isPlaying) {
          sound.pauseAsync();
          setIsPlaying(false);
        } else {
          playSound();
        }
      }} />

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SimpleWaveform samples={samples} />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
