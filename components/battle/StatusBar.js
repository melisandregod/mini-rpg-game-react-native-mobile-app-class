// components/battle/StatusBar.js
import { View, Text, StyleSheet } from "react-native";
import { calculateHPPercentage } from "../../utils/battleUtils";

export default function StatusBar({ player, playerHP, monster, monsterHP }) {
  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.name}>{player.class} Lv.{player.level}</Text>
        <View style={styles.barBox}>
          <View style={[styles.hpBar, { width: `${calculateHPPercentage(playerHP, player.maxHP)}%` }]} />
          <Text style={styles.barText}>{playerHP}/{player.maxHP}</Text>
        </View>
        <View style={styles.barBox}>
          <View style={[styles.mpBar, { width: `${calculateHPPercentage(player.mp, player.maxMP)}%` }]} />
          <Text style={styles.barText}>{player.mp}/{player.maxMP}</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.name}>{monster.name}</Text>
        <View style={styles.barBox}>
          <View style={[styles.hpBar, { width: `${calculateHPPercentage(monsterHP, monster.hp)}%`, backgroundColor: "#ff5050" }]} />
          <Text style={styles.barText}>{monsterHP}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 8,
    width: "48%",
  },
  name: {
    fontFamily: "8bitTH",
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 18
  },
  barBox: {
    height: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 4,
    position: "relative",
  },
  hpBar: {
    height: "100%",
    backgroundColor: "#ff3232",
    position: "absolute",
    left: 0,
    top: 0,
  },
  mpBar: {
    height: "100%",
    backgroundColor: "#3264ff",
    position: "absolute",
    left: 0,
    top: 0,
  },
  barText: {
    fontFamily: '8bitTH',
    color: "white",
    fontSize: 14,
    textAlign: "center",
    position: "absolute",
    width: "100%",
    lineHeight: 18,
  },
});
