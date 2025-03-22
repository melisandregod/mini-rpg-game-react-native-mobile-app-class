import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useGame } from "../context/GameContext";

export default function Profile() {
  const { player } = useGame(); // ดึงข้อมูลตัวละครจาก context
  const router = useRouter();

  if (!player) {
    return (
      <View style={styles.container}>
        <Text>⚠️ ยังไม่มีตัวละคร</Text>
        <Button
          title="กลับไปเลือกอาชีพ"
          onPress={() => router.replace("/character-creation")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧍‍♂️ ตัวละครของคุณ</Text>
      <Text style={styles.stat}>อาชีพ: {player.class}</Text>
      <Text style={styles.stat}>Level: {player.level}</Text>
      <Text style={styles.stat}>EXP: {player.exp}</Text>
      <Text>
        HP: {player.hp} / {player.maxHP}
      </Text>
      <Text>
        MP: {player.mp} / {player.maxMP}
      </Text>

      <Text style={styles.stat}>ATK: {player.atk}</Text>
      <Text style={styles.stat}>DEF: {player.def}</Text>

      <View style={{ marginTop: 20 }}>
        <Button
          title="เริ่ม Battle!"
          onPress={() => router.push("/battle-ui-demo")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  stat: { fontSize: 16, marginVertical: 2 },
});
