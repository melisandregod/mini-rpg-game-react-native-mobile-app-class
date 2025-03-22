// components/battle/MonsterDisplay.js
import { Animated, Image, StyleSheet } from "react-native";

export default function MonsterDisplay({ monster, animRefs }) {
  return (
    <Animated.View
      style={[
        styles.monsterContainer,
        {
          transform: [
            { translateX: Animated.add(animRefs.current.monsterShakeAnim, animRefs.current.monsterAttackAnim) },
            { translateY: Animated.add(animRefs.current.monsterJumpAnim, animRefs.current.monsterIdleAnim) },
            { rotate: animRefs.current.monsterRotateAnim.interpolate({ inputRange: [-0.1, 0, 0.1], outputRange: ["-10deg", "0deg", "10deg"] }) },
            { scale: animRefs.current.monsterScaleAnim },
          ],
        },
      ]}
    >
      <Image source={require("../../assets/monsters/goblin.png")} style={styles.monster} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  monsterContainer: {
    alignItems: "center",
  },
  monster: {
    width: 160,
    height: 160,
  },
});
