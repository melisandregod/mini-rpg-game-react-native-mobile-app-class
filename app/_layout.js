import { Stack } from 'expo-router';
import { GameProvider } from '../context/GameContext';
import { useFonts } from 'expo-font';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    '8bitTH': require('../assets/fonts/TA8bit.ttf'), 
    '8bit': require('../assets/fonts/Daydream.ttf'), 
  });

  if (!fontsLoaded) {
    return null; // หรือ <Text>Loading...</Text>
  }

  return (
    <GameProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GameProvider>
  );
}
