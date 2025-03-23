// 🔄 นี่คือไฟล์หลักที่เรียกใช้ component & animation ที่แยกออกมาแล้ว
import { useEffect, useState, useRef } from "react";
import { View, Text, Animated, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useGame } from "../context/GameContext";
import { levelUp } from "../utils/levelUp";
import monsters from "../data/monsters";

//data
import allItems from "../data/items";

// 👉 ใช้งาน Component ที่แยกไว้
import BattleLog from "../components/battle/BattleLog";
import CharacterDisplay from "../components/battle/CharacterDisplay";
import MonsterDisplay from "../components/battle/MonsterDisplay";
import ActionMenu from "../components/battle/ActionMenu";
import StatusBar from "../components/battle/StatusBar";

// 👉 ใช้งานเมนูย่อย
import SkillMenu from "../components/battle/SkillMenu";
import ItemMenu from "../components/battle/ItemMenu";

// 👉 ใช้งาน animation และ utils
import {
  animatePlayerAttack,
  animatePlayerSkill,
  animateMonsterAttack,
  flashPlayer,
  shakeMonster,
  startIdleAnimations,
} from "../animations/battleAnimations";
import { calculateHPPercentage } from "../utils/battleUtils";
import BattleBackground from "../components/battle/BattleBackground";

export default function BattleScreen() {
  // 🧠 Context และ State
  const { player, setPlayer, setBattleResult } = useGame();
  const router = useRouter();

  const [monster, setMonster] = useState(null);
  const [playerHP, setPlayerHP] = useState(player.hp);
  const [monsterHP, setMonsterHP] = useState(0);
  const [turn, setTurn] = useState("player");
  const [battleLog, setBattleLog] = useState([]);
  const [showItems, setShowItems] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  // 🧪 animations ที่จำเป็นจะถูกจัดการจากภายนอก (ส่ง ref เข้าไป)
  const animationRefs = useRef({
    playerAttackAnim: new Animated.Value(0),
    playerJumpAnim: new Animated.Value(0),
    playerRotateAnim: new Animated.Value(0),
    playerScaleAnim: new Animated.Value(1),
    playerFadeAnim: new Animated.Value(1),

    monsterShakeAnim: new Animated.Value(0),
    monsterJumpAnim: new Animated.Value(0),
    monsterAttackAnim: new Animated.Value(0),
    monsterScaleAnim: new Animated.Value(1),
    monsterRotateAnim: new Animated.Value(0),

    playerIdleAnim: new Animated.Value(0),
    monsterIdleAnim: new Animated.Value(0),
  });

  // 🎲 เริ่มต่อสู้
  useEffect(() => {
    const m = monsters[Math.floor(Math.random() * monsters.length)];
    if (m && typeof m.hp === "number") {
      setMonster(m);
      setMonsterHP(m.hp);
      setBattleLog([`${m.name} ปรากฏตัว!`]);
      startIdleAnimations(animationRefs);
    }
  }, []);

  // 👊 โจมตี
  const handleAttack = () => {
    if (!monster || turn !== "player") return;
    animatePlayerAttack(animationRefs, () => shakeMonster(animationRefs));
    const dmg = Math.max(player.atk - monster.def, 1);
    setTimeout(() => {
      setMonsterHP((prev) => Math.max(prev - dmg, 0));
      setBattleLog((prev) => [
        `${player.class} โจมตี! ทำดาเมจ ${dmg}`,
        ...prev,
      ]);
      setTurn("monster");
    }, 600);
  };

  // ✨ ใช้สกิล
  const handleSkill = (skill) => {
    if (player.mp < skill.mpCost) {
      setBattleLog((prev) => ["MP ไม่พอสำหรับสกิลนี้!", ...prev]);
      return;
    }
    setPlayer((prev) => ({ ...prev, mp: prev.mp - skill.mpCost }));
    animatePlayerSkill(animationRefs, skill, () => shakeMonster(animationRefs));
    setTimeout(() => {
      setMonsterHP((prev) => Math.max(prev - skill.power, 0));

      setBattleLog((prev) => [
        `${player.class} ใช้สกิล ${skill.name}!`,
        ...prev,
      ]);
      setTurn("monster");
    }, 1200);
    setShowSkills(false);
  };

  // 🧪 ใช้ไอเทม
  const useItem = (item, index) => {
    const newInventory = [...player.inventory];
    newInventory.splice(index, 1);

    if (item.target === "hp") {
      const healed = Math.min(playerHP + item.value, player.maxHP);
      setPlayerHP(healed);
      setPlayer((prev) => ({ ...prev, hp: healed, inventory: newInventory }));
      setBattleLog((prev) => [`ฟื้น HP ${item.value} แต้ม`, ...prev]);
    } else if (item.target === "mp") {
      const newMP = Math.min(player.mp + item.value, player.maxMP);
      setPlayer((prev) => ({ ...prev, mp: newMP, inventory: newInventory }));
      setBattleLog((prev) => [`ฟื้น MP ${item.value} แต้ม`, ...prev]);
    }
    setShowItems(false);
  };

  // 🧠 Turn ของมอนสเตอร์
  useEffect(() => {
    if (turn === "monster" && monsterHP > 0) {
      setTimeout(() => {
        animateMonsterAttack(animationRefs, () => flashPlayer(animationRefs));
        setTimeout(() => {
          const dmg = Math.max(monster.atk - player.def, 1);
          setPlayerHP((prev) => Math.max(prev - dmg, 0));
          setPlayer((prev) => ({ ...prev, hp: Math.max(prev.hp - dmg, 0) }));
          setBattleLog((prev) => [
            `${monster.name} โจมตี! ทำดาเมจ ${dmg}`,
            ...prev,
          ]);
          setTurn("player");
        }, 600);
      }, 1000);
    }
  }, [turn]);

  // ✅ ตรวจสอบแพ้/ชนะ
  useEffect(() => {
    if (!monster) return;
    if (monsterHP <= 0) {
      // ดรอปไอเทมแบบสุ่ม
      const dropName =
        monster.itemDrops?.[
          Math.floor(Math.random() * monster.itemDrops.length)
        ];
      const droppedItem = allItems.find((item) => item.name === dropName);

      let updatedInventory = [...player.inventory];
      let dropLog = null;

      if (droppedItem) {
        updatedInventory.push(droppedItem);
        dropLog = `ได้รับไอเทม: ${droppedItem.name}`;
      }
      const gainedExp = monster.exp;
      const newExp = player.exp + gainedExp;
      let updatedPlayer = {
        ...player,
        exp: newExp % 100,
        inventory: updatedInventory,
      };
      if (newExp >= 100) updatedPlayer = levelUp(updatedPlayer);
      setPlayer(updatedPlayer);
      if (dropLog) setBattleLog((prev) => [dropLog, ...prev]);
      setBattleResult({ outcome: "win", gainedExp, monster, droppedItem });
      setTimeout(() => router.replace("/result"), 2000);
    } else if (playerHP <= 0) {
      setBattleResult({ outcome: "lose", gainedExp: 0, monster });
      setTimeout(() => router.replace("/result"), 2000);
    }
  }, [monsterHP, playerHP]);

  if (!monster) return <Text>กำลังโหลด...</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <BattleBackground />
      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <StatusBar
          player={player}
          playerHP={playerHP}
          monster={monster}
          monsterHP={monsterHP}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            flex: 1,
            marginBottom: 20,
          }}
        >
          <CharacterDisplay player={player} animRefs={animationRefs} />
          <MonsterDisplay monster={monster} animRefs={animationRefs} />
        </View>

        <View style={{ marginBottom: 10 }}>
          <BattleLog logs={battleLog} />
        </View>

        {turn === "player" ? (
          <>
            <ActionMenu
              onAttack={handleAttack}
              onShowItems={() => {
                setShowItems(true);
                setShowSkills(false);
              }}
              onShowSkills={() => {
                setShowSkills(true);
                setShowItems(false);
              }}
              onRun={() => {
                setBattleResult(null); // เคลียร์ผลการต่อสู้
                router.replace("/profile"); // กลับหน้าโปรไฟล์
              }}
            />

            {showSkills && (
              <SkillMenu
                skills={player.skills}
                mp={player.mp}
                onSelect={handleSkill}
                onCancel={() => setShowSkills(false)}
              />
            )}

            {showItems && (
              <ItemMenu
                items={player.inventory}
                onUse={useItem}
                onCancel={() => setShowItems(false)}
              />
            )}
          </>
        ) : (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 18 }}>
              {monster.name} กำลังโจมตี...
            </Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
