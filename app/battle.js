import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useGame } from "../context/GameContext";
import { levelUp } from "../utils/levelUp";
import monsters from "../data/monsters";

export default function Battle() {
  const { player, setPlayer, setBattleResult } = useGame();
  const router = useRouter();

  const [monster, setMonster] = useState(null);
  const [playerHP, setPlayerHP] = useState(player.hp);
  const [monsterHP, setMonsterHP] = useState(0);
  const [turn, setTurn] = useState("player");
  const [showItems, setShowItems] = useState(false);

  // เมื่อโหลดหน้า → สุ่มมอนสเตอร์
  useEffect(() => {
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];

    if (randomMonster && typeof randomMonster.hp === "number") {
      setMonster(randomMonster);
      setMonsterHP(randomMonster.hp);
    } else {
      console.warn("🐛 Monster hp ไม่ถูกต้อง:", randomMonster);
    }
  }, []);

  const handleAttack = () => {
    if (!monster) return;

    if (turn === "player") {
      // คำนวณ damage
      const dmg = Math.max(player.atk - monster.def, 1);
      const newHP = Math.max(monsterHP - dmg, 0);
      setMonsterHP(newHP);

      // เปลี่ยนเป็นมอนสเตอร์โจมตี
      setTurn("monster");
    }
  };

  const handleSkill = (skill) => {
    if (player.mp < skill.mpCost) {
      alert("MP ไม่พอ!");
      return;
    }

    const dmg = skill.power;
    const newMonsterHP = Math.max(monsterHP - dmg, 0);
    setMonsterHP(newMonsterHP);

    // หัก MP
    setPlayer({
      ...player,
      mp: player.mp - skill.mpCost,
    });

    setTurn("monster");
  };

  useEffect(() => {
    if (turn === "monster" && monsterHP > 0) {
      const timeout = setTimeout(() => {
        const dmg = Math.max(monster.atk - player.def, 1);
        const newHP = Math.max(playerHP - dmg, 0);
        setPlayerHP(newHP);
        setTurn("player");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [turn, monster]);

  useEffect(() => {
    if (!monster || !player) return;
    if (monsterHP <= 0) {
      // ชนะ
      const newExp = player.exp + monster.exp;
      let updatedPlayer = { ...player, exp: newExp % 100 }; // mod 100 ถ้าเกิน 100

      if (newExp >= 100) {
        updatedPlayer = levelUp(updatedPlayer); // เพิ่ม stat และ level
      }

      setPlayer(updatedPlayer);
      setBattleResult({
        outcome: "win",
        gainedExp: monster.exp,
        monster,
      });
      router.replace("/result");
    } else if (playerHP <= 0) {
      // แพ้
      setBattleResult({
        outcome: "lose",
        gainedExp: 0,
        monster,
      });
      router.replace("/result");
    }
  }, [monsterHP, playerHP]);

  if (!monster) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battle!</Text>

      <Text style={styles.section}>👾 {monster.name}</Text>
      <Text>HP: {monsterHP}</Text>

      <View style={styles.vs}>
        <Text>VS</Text>
      </View>

      <Text style={styles.section}>{player.class}</Text>
      <Text>
        HP: {playerHP} / {player.maxHP}
      </Text>
      <Text>
        MP: {player.mp} / {player.maxMP}
      </Text>

      {turn === "player" ? (
        <View style={{ marginTop: 20 }}>
          <Button title="โจมตี" onPress={handleAttack} />
          <Button
            title="ใช้สกิล"
            onPress={() => handleSkill(player.skills[0])}
          />
          <Button title="ใช้ไอเทม" onPress={() => setShowItems(true)} />
          {showItems && (
            <View style={{ marginTop: 10 }}>
              {player.inventory.map((item, index) => (
                <Button
                  key={index}
                  title={`${item.name} (+${
                    item.value
                  } ${item.target.toUpperCase()})`}
                  onPress={() => {
                    if (item.target === "hp") {
                      setPlayerHP(
                        Math.min(playerHP + item.value, player.maxHP)
                      );
                    } else if (item.target === "mp") {
                      setPlayer((prev) => ({
                        ...prev,
                        mp: Math.min(prev.mp + item.value, prev.maxMP),
                      }));
                    }

                    setShowItems(false);
                  }}
                />
              ))}
            </View>
          )}
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>มอนสเตอร์กำลังโจมตี...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 24, marginBottom: 16 },
  section: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  vs: { marginVertical: 16 },
});
