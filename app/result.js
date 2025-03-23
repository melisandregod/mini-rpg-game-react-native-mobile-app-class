import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useGame } from '../context/GameContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

export default function Result() {
  const { battleResult, setBattleResult, setPlayer } = useGame();
  const router = useRouter();
  const [isGameOver, setIsGameOver] = useState(false);

  // ไม่มีข้อมูล
  if (!battleResult) {
    return (
      <View style={styles.centeredContainer}>
        <Text>ไม่มีข้อมูลการต่อสู้</Text>
      </View>
    );
  }

  const { outcome, gainedExp, monster, droppedItem } = battleResult;

  // ถ้าแพ้ ให้แสดง Game Over แล้วกลับบ้าน
  useEffect(() => {
    if (outcome === 'lose') {
      setIsGameOver(true);

      setTimeout(() => {
        setPlayer(null);         // ล้างตัวละคร
        setBattleResult(null);   // ล้างผลการต่อสู้
        router.replace('/');     // กลับหน้าแรก
      }, 2000);
    }
  }, []);

  // Game Over Screen
  if (isGameOver) {
    return (
      <ImageBackground
        source={require('../assets/backgrounds/forest.jpeg')}
        style={styles.background}
        blurRadius={3}
      >
        <View style={styles.overlay} />
        <View style={styles.centeredContainer}>
          <Text style={styles.gameOverText}>Game Over </Text>
        </View>
      </ImageBackground>
    );
  }

  // กรณีชนะ
  const handleReturn = () => {
    setBattleResult(null);
    router.replace('/profile');
  };

  return (
    <ImageBackground
      source={require('../assets/backgrounds/forest.jpeg')}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.resultBox}>
          <Text style={styles.title}>🎉 คุณชนะ!</Text>
          <Text style={styles.detail}>ศัตรู: {monster.name}</Text>
          <Text style={styles.detail}>EXP ที่ได้รับ: {gainedExp}</Text>

          {droppedItem && (
            <View style={styles.dropBox}>
              <Text style={styles.dropTitle}>ดรอปไอเทม</Text>
              <Text style={styles.dropText}>ชื่อ: {droppedItem.name}</Text>
              {droppedItem.target && (
                <Text style={styles.dropText}>ประเภท: {droppedItem.target.toUpperCase()}</Text>
              )}
              {typeof droppedItem.value !== 'undefined' && (
                <Text style={styles.dropText}>มูลค่า: {droppedItem.value}</Text>
              )}
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={handleReturn}>
            <LinearGradient
              colors={['#27ae60', '#2ecc71']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>กลับไปหน้าโปรไฟล์</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultBox: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    maxWidth: 360,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f1c40f',
    textAlign: 'center',
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    color: '#ecf0f1',
    marginBottom: 6,
  },
  dropBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dropTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 6,
  },
  dropText: {
    color: '#ecf0f1',
    fontSize: 14,
    marginBottom: 2,
  },
  button: {
    marginTop: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
});
