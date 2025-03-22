// components/battle/SkillMenu.js
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SkillMenu({ skills, mp, onSelect, onCancel }) {
  return (
    <View style={styles.menu}>
      <Text style={styles.title}>เลือกสกิล:</Text>
      {skills.map((skill, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.item,
            mp < skill.mpCost && styles.disabled,
          ]}
          onPress={() => onSelect(skill)}
          disabled={mp < skill.mpCost}
        >
          <Text style={styles.text}>
            {skill.name} <Text style={styles.cost}>MP {skill.mpCost}</Text>
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.cancel} onPress={onCancel}>
        <Text style={styles.cancelText}>ยกเลิก</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#8080ff",
  },
  title: {
    color: "#ffcc00",
    fontWeight: "bold",
    marginBottom: 8,
  },
  item: {
    backgroundColor: "rgba(59, 59, 152, 0.5)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#6060aa",
  },
  disabled: {
    backgroundColor: "rgba(80, 80, 80, 0.5)",
    borderColor: "#999",
  },
  text: {
    color: "white",
  },
  cost: {
    color: "#aaf",
    fontSize: 12,
  },
  cancel: {
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
});
