// components/battle/ActionMenu.js
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ActionMenu({ onAttack, onShowSkills, onShowItems , onRun}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={onAttack}>
          <Text style={styles.text}>โจมตี</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onShowSkills}>
          <Text style={styles.text}>สกิล</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={onShowItems}>
          <Text style={styles.text}>ไอเทม</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onRun}>
          <Text style={styles.text}>หนี</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 8,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "rgba(80, 200, 120, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#023020",
  },
  text: {
    fontFamily: '8bitTH',
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
