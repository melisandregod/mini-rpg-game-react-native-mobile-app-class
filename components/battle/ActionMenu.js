// components/battle/ActionMenu.js
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ActionMenu({ onAttack, onShowSkills, onShowItems }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={onAttack}>
          <Text style={styles.text}>🗡️ โจมตี</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onShowSkills}>
          <Text style={styles.text}>✨ สกิล</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={onShowItems}>
          <Text style={styles.text}>🧪 ไอเทม</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("ไม่สามารถหนีได้!")}
        >
          <Text style={styles.text}>🏃 หนี</Text>
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
    backgroundColor: "rgba(59, 59, 152, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8080ff",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
