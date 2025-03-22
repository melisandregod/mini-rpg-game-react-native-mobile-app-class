import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useGame } from '../context/GameContext';

export default function Result() {
  const { battleResult, setBattleResult } = useGame();
  const router = useRouter();

  if (!battleResult) {
    return (
      <View style={styles.container}>
        <Text>❌ ไม่มีข้อมูลการต่อสู้</Text>
        <Button title="กลับไปหน้าแรก" onPress={() => router.replace('/')} />
      </View>
    );
  }

  const { outcome, gainedExp, monster } = battleResult;

  const handleReturn = () => {
    setBattleResult(null); // เคลียร์ผลการต่อสู้เก่า
    router.replace('/profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {outcome === 'win' ? '🎉 คุณชนะ!' : '💀 คุณแพ้'}
      </Text>

      <Text style={styles.detail}>ศัตรู: {monster.name}</Text>
      <Text style={styles.detail}>EXP ที่ได้รับ: {gainedExp}</Text>

      <Button title="กลับไปหน้าโปรไฟล์" onPress={handleReturn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  detail: { fontSize: 16, marginVertical: 4 },
});
