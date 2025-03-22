// components/battle/ItemMenu.js
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ItemMenu({ items, onUse, onCancel }) {
  return (
    <View style={styles.menu}>
      <Text style={styles.title}>เลือกไอเทม:</Text>
      {items.length > 0 ? (
        items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => onUse(item, index)}
          >
            <Text style={styles.text}>
              {item.name} <Text style={styles.cost}>+{item.value} {item.target.toUpperCase()}</Text>
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noItems}>ไม่มีไอเทม</Text>
      )}
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
  text: {
    color: "white",
  },
  cost: {
    color: "#aaf",
    fontSize: 12,
  },
  noItems: {
    color: "#aaa",
    fontStyle: "italic",
    padding: 8,
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
