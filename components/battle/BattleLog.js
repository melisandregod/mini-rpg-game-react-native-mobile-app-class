// components/battle/BattleLog.js
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function BattleLog({ logs }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {logs.slice(0, 4).map((log, i) => (
          <Text key={i} style={styles.text}>{log}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    height: 100,
  },
  text: {
    color: "white",
    fontSize: 14,
    marginBottom: 4,
  },
});
