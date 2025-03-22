import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useGame } from "../context/GameContext";
import classes from "../data/classes";
import allSkills from "../data/skills";
import allItems from "../data/items";
import skills from "../data/skills";

export default function CharacterCreation() {
  const { setPlayer } = useGame(); //เก็บข้อมูลผู้เล่นนะ
  const router = useRouter();

  const chooseClass = (className) => {
    const baseStats = classes[className]; // ✅ สร้างตัวแปรก่อน

    const newPlayer = {
      name: className,
      class: className,
      level: 1,
      exp: 0,
      ...baseStats,
      hp: baseStats.hp,
      mp: baseStats.mp,
      maxHP: baseStats.hp,
      maxMP: baseStats.mp,
      skills: allSkills[className],
      inventory: [...allItems],
    };

    setPlayer(newPlayer); // save ลง context
    router.replace("profile");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>เลือกอาชีพของคุณ</Text>

      {Object.keys(classes).map((className) => (
        <View key={className} style={styles.buttonContainer}>
          <Button title={className} onPress={() => chooseClass(className)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, marginBottom: 20 },
  buttonContainer: { marginVertical: 10, width: 200 },
});
