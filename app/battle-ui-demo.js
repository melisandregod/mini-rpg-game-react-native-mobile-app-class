import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const [showSkills, setShowSkills] = useState(false);
  const [battleLog, setBattleLog] = useState([]);
  const [shakeAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(1));
  const [playerAttackAnim] = useState(new Animated.Value(0));
  

  const getCharacterImage = (className) => {
    switch (className) {
      //   case "Mage":
      //     return require("../assets/characters/mage.png");
      //   case "Assassin":
      //     return require("../assets/characters/assassin.png");
      case "Knight":
      default:
        return require("../assets/characters/knight.png");
    }
  };

  const shakeMonster = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const flashPlayer = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // New animation for player attack
  const animatePlayerAttack = () => {
    Animated.sequence([
      // Move forward toward monster
      Animated.timing(playerAttackAnim, {
        toValue: 50,
        duration: 150,
        useNativeDriver: true,
      }),
      // Return to original position
      Animated.timing(playerAttackAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After player animation completes, shake the monster
      shakeMonster();
    });
  };

  useEffect(() => {
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
    if (randomMonster && typeof randomMonster.hp === "number") {
      setMonster(randomMonster);
      setMonsterHP(randomMonster.hp);
      setBattleLog([`${randomMonster.name} ปรากฏตัว!`]);
    }
  }, []);

  const handleAttack = () => {
    if (!monster || turn !== "player") return;

    setBattleLog((prev) => [
      `${player.class} โจมตี! ทำดาเมจ ${Math.max(
        player.atk - monster.def,
        1
      )} แต้ม`,
      ...prev,
    ]);

    // Start player attack animation
    animatePlayerAttack();

    // Delay applying damage and turn change until after animation
    setTimeout(() => {
      const dmg = Math.max(player.atk - monster.def, 1);
      setMonsterHP((prev) => Math.max(prev - dmg, 0));
      setTurn("monster");
    }, 300); // Delay matches the animation duration
  };

  const handleSkill = (skill) => {
    if (player.mp < skill.mpCost) {
      setBattleLog((prev) => ["MP ไม่พอสำหรับสกิลนี้!", ...prev]);
      return;
    }

    setBattleLog((prev) => [
      `${player.class} ใช้สกิล ${skill.name}! ทำดาเมจ ${skill.power} แต้ม`,
      ...prev,
    ]);

    // Start player attack animation for skill too
    animatePlayerAttack();

    // Delay applying damage and turn change until after animation
    setTimeout(() => {
      const dmg = skill.power;
      setMonsterHP((prev) => Math.max(prev - dmg, 0));
      setPlayer((prev) => ({ ...prev, mp: prev.mp - skill.mpCost }));
      setTurn("monster");
    }, 300);

    setShowSkills(false);
  };

  const useItem = (item, index) => {
    const updatedInventory = [...player.inventory];
    updatedInventory.splice(index, 1);

    if (item.target === "hp") {
      setPlayerHP((prev) => {
        const healed = Math.min(prev + item.value, player.maxHP);
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          hp: healed,
          inventory: updatedInventory,
        }));
        return healed;
      });
      setBattleLog((prev) => [
        `${player.class} ใช้ ${item.name} ฟื้นฟู HP ${item.value} แต้ม`,
        ...prev,
      ]);
    } else if (item.target === "mp") {
      const newMP = Math.min(player.mp + item.value, player.maxMP);
      setPlayer((prev) => ({
        ...prev,
        mp: newMP,
        inventory: updatedInventory,
      }));
      setBattleLog((prev) => [
        `${player.class} ใช้ ${item.name} ฟื้นฟู MP ${item.value} แต้ม`,
        ...prev,
      ]);
    }

    setShowItems(false);
  };

  useEffect(() => {
    if (turn === "monster" && monsterHP > 0) {
      const timeout = setTimeout(() => {
        const dmg = Math.max(monster.atk - player.def, 1);
        setPlayerHP((prevHP) => {
          const newHP = Math.max(prevHP - dmg, 0);
          setPlayer((prev) => ({ ...prev, hp: newHP }));
          return newHP;
        });
        setBattleLog((prev) => [
          `${monster.name} โจมตี! ทำดาเมจ ${dmg} แต้ม`,
          ...prev,
        ]);
        flashPlayer();
        setTurn("player");
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [turn, monster]);

  useEffect(() => {
    if (!monster || !player) return;
    if (monsterHP <= 0) {
      const newExp = player.exp + monster.exp;
      let updatedPlayer = { ...player, exp: newExp % 100 };
      if (newExp >= 100) updatedPlayer = levelUp(updatedPlayer);
      setPlayer(updatedPlayer);
      setBattleResult({ outcome: "win", gainedExp: monster.exp, monster });
      setBattleLog((prev) => [
        `${monster.name} พ่ายแพ้! ได้รับ ${monster.exp} EXP`,
        ...prev,
      ]);
      setTimeout(() => router.replace("/result"), 2000);
    } else if (playerHP <= 0) {
      setBattleResult({ outcome: "lose", gainedExp: 0, monster });
      setBattleLog((prev) => [`${player.class} พ่ายแพ้...`, ...prev]);
      setTimeout(() => router.replace("/result"), 2000);
    }
  }, [monsterHP, playerHP]);

  const calculateHPPercentage = (current, max) => {
    return (current / max) * 100;
  };

  if (!monster)
    return (
      <ImageBackground
        source={require("../assets/backgrounds/forest.jpeg")}
        style={styles.loadingBg}
      >
        <Text style={styles.loadingText}>กำลังโหลด...</Text>
      </ImageBackground>
    );

  return (
    <ImageBackground
      source={require("../assets/backgrounds/forest.jpeg")}
      style={styles.bg}
    >
      <SafeAreaView style={styles.battleContainer}>
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <View style={styles.playerInfo}>
            <Text style={styles.nameText}>
              {player.class} Lv.{player.level}
            </Text>
            <View style={styles.hpBarContainer}>
              <View
                style={[
                  styles.hpBar,
                  {
                    width: `${calculateHPPercentage(playerHP, player.maxHP)}%`,
                  },
                ]}
              />
              <Text style={styles.hpText}>
                {playerHP}/{player.maxHP}
              </Text>
            </View>
            <View style={styles.mpBarContainer}>
              <View
                style={[
                  styles.mpBar,
                  {
                    width: `${calculateHPPercentage(player.mp, player.maxMP)}%`,
                  },
                ]}
              />
              <Text style={styles.mpText}>
                {player.mp}/{player.maxMP}
              </Text>
            </View>
          </View>

          <View style={styles.monsterInfo}>
            <Text style={styles.nameText}>{monster.name}</Text>
            <View style={styles.hpBarContainer}>
              <View
                style={[
                  styles.monsterHpBar,
                  { width: `${calculateHPPercentage(monsterHP, monster.hp)}%` },
                ]}
              />
              <Text style={styles.hpText}>{monsterHP}</Text>
            </View>
          </View>
        </View>

        {/* Battle Characters */}
        <View style={styles.battleScene}>
          <Animated.View
            style={[
              styles.characterContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateX: playerAttackAnim }],
              },
            ]}
          >
            <Image
              source={getCharacterImage(player.class)}
              style={styles.character}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.monsterContainer,
              { transform: [{ translateX: shakeAnim }] },
            ]}
          >
            <Image
              source={require("../assets/monsters/goblin.png")}
              style={styles.monster}
            />
          </Animated.View>
        </View>

        {/* Battle Log */}
        <View style={styles.battleLogContainer}>
          <ScrollView style={styles.battleLog}>
            {battleLog.slice(0, 4).map((log, index) => (
              <Text key={index} style={styles.battleLogText}>
                {log}
              </Text>
            ))}
          </ScrollView>
        </View>

        {/* Player Turn Menu */}
        {turn === "player" ? (
          <View style={styles.actionMenu}>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleAttack}
              >
                <Text style={styles.actionText}>🗡️ โจมตี</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  setShowSkills(!showSkills);
                  setShowItems(false);
                }}
              >
                <Text style={styles.actionText}>✨ สกิล</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  setShowItems(!showItems);
                  setShowSkills(false);
                }}
              >
                <Text style={styles.actionText}>🧪 ไอเทม</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  setBattleLog((prev) => ["ไม่สามารถหนีได้!", ...prev]);
                }}
              >
                <Text style={styles.actionText}>🏃 หนี</Text>
              </TouchableOpacity>
            </View>

            {/* Skills */}
            {showSkills && (
              <View style={styles.subMenu}>
                <Text style={styles.subMenuTitle}>เลือกสกิล:</Text>
                {player.skills.map((skill, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.subMenuItem,
                      player.mp < skill.mpCost && styles.disabledButton,
                    ]}
                    onPress={() => handleSkill(skill)}
                    disabled={player.mp < skill.mpCost}
                  >
                    <Text style={styles.subMenuText}>
                      {skill.name}{" "}
                      <Text style={styles.costText}>MP {skill.mpCost}</Text>
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowSkills(false)}
                >
                  <Text style={styles.cancelText}>ยกเลิก</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Items */}
            {showItems && (
              <View style={styles.subMenu}>
                <Text style={styles.subMenuTitle}>เลือกไอเทม:</Text>
                {player.inventory.length > 0 ? (
                  player.inventory.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.subMenuItem}
                      onPress={() => useItem(item, index)}
                    >
                      <Text style={styles.subMenuText}>
                        {item.name}{" "}
                        <Text style={styles.costText}>
                          +{item.value} {item.target.toUpperCase()}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.noItemsText}>ไม่มีไอเทม</Text>
                )}
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowItems(false)}
                >
                  <Text style={styles.cancelText}>ยกเลิก</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.enemyTurnContainer}>
            <Text style={styles.enemyTurnText}>
              {monster.name} กำลังโจมตี...
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
  },
  loadingBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 24,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  battleContainer: {
    flex: 1,
    padding: 10,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  playerInfo: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 8,
    width: "48%",
  },
  monsterInfo: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 8,
    width: "48%",
  },
  nameText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  hpBarContainer: {
    height: 18,
    backgroundColor: "rgba(255, 0, 0, 0.3)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 4,
    position: "relative",
    borderWidth: 1,
    borderColor: "#333",
  },
  hpBar: {
    height: "100%",
    backgroundColor: "#ff3232",
    position: "absolute",
    left: 0,
    top: 0,
  },
  monsterHpBar: {
    height: "100%",
    backgroundColor: "#ff3232",
    position: "absolute",
    left: 0,
    top: 0,
  },
  mpBarContainer: {
    height: 18,
    backgroundColor: "rgba(0, 0, 255, 0.3)",
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#333",
  },
  mpBar: {
    height: "100%",
    backgroundColor: "#3264ff",
    position: "absolute",
    left: 0,
    top: 0,
  },
  hpText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    position: "absolute",
    width: "100%",
    lineHeight: 18,
  },
  mpText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    position: "absolute",
    width: "100%",
    lineHeight: 18,
  },
  battleScene: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  monsterContainer: {
    alignItems: "center",
  },
  characterContainer: {
    alignItems: "center",
  },
  monster: {
    width: 160,
    height: 160,
  },
  character: {
    width: 160,
    height: 160,
  },
  battleLogContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    height: 100,
  },
  battleLog: {
    height: "100%",
  },
  battleLogText: {
    color: "white",
    fontSize: 14,
    marginBottom: 4,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  actionMenu: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 8,
    padding: 10,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: "rgba(59, 59, 152, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8080ff",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subMenu: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#8080ff",
  },
  subMenuTitle: {
    color: "#ffcc00",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subMenuItem: {
    backgroundColor: "rgba(59, 59, 152, 0.5)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#6060aa",
  },
  disabledButton: {
    backgroundColor: "rgba(80, 80, 80, 0.5)",
    borderColor: "#999",
  },
  subMenuText: {
    color: "white",
    fontSize: 14,
  },
  costText: {
    color: "#aaf",
    fontSize: 12,
  },
  cancelButton: {
    backgroundColor: "rgba(150, 40, 40, 0.7)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aa6060",
  },
  cancelText: {
    color: "white",
    fontWeight: "bold",
  },
  noItemsText: {
    color: "#aaa",
    fontStyle: "italic",
    padding: 8,
  },
  enemyTurnContainer: {
    backgroundColor: "rgba(150, 0, 0, 0.7)",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  enemyTurnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
