import { View, Text ,Button } from 'react-native';
import { useGame } from '../context/GameContext';
import { router } from 'expo-router';

export default function Home() {
  const { player } = useGame();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🎮 Welcome to Mini RPG!</Text>
      <Text>{player ? `Player: ${player.name}` : 'ยังไม่มีตัวละคร'}</Text>
      <Button title="ไปเลือกอาชีพ" onPress={() => router.push('/character-creation')} />
    </View>
  );
}
