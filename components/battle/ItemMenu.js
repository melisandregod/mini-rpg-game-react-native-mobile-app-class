// components/battle/ItemMenu.js
import { View, Text, TouchableOpacity, StyleSheet ,FlatList} from "react-native";

const ITEM_HEIGHT = 80; // ปรับตามความสูงของไอเทมที่คุณต้องการ

export default function ItemMenu({ items, onUse, onCancel }) {
  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.item} onPress={() => onUse(item, index)}>
      <Text style={styles.text}>
        {item.name} <Text style={styles.cost}>+{item.value} {item.target.toUpperCase()}</Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.menu}>
      <Text style={styles.title}>เลือกไอเทม:</Text>

      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          style={{ height: ITEM_HEIGHT }} 
        />
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
    borderColor: "#023020",
  },
  title: {
    fontFamily: "8bitTH",
    color: "#ffcc00",
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 18
  },
  item: {
    backgroundColor: "rgba(80, 200, 120, 0.8)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#023020",
  },
  text: {
    fontFamily: "8bitTH",
    color: "white",
    fontSize: 18,
  },
  cost: {
    color: "white",
    fontSize: 16,
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
    fontFamily: "8bitTH",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
