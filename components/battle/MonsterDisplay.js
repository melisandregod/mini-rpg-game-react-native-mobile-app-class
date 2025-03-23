import { Animated, Image, StyleSheet } from "react-native";

export default function MonsterDisplay({ monster, animRefs }) {
  const getMonsterImage = (name) => {
    switch (name) {
      case "Goblin":
        return require("../../assets/monsters/goblin.png");
      case "Orc":
        return require("../../assets/monsters/Orc.png");
      case "Dragon":
        return require("../../assets/monsters/Dragon.png");
      default:
        return require("../../assets/monsters/goblin.png");
    }
  };

  return (
    <Animated.View
      style={[
        styles.monsterContainer,
        {
          transform: [
            {
              translateX: Animated.add(
                Animated.multiply(animRefs.current.monsterIdleAnim, 4),
                animRefs.current.monsterShakeAnim,
                animRefs.current.monsterAttackAnim
              ),
            },
            { translateY: animRefs.current.monsterJumpAnim },
            {
              rotate: animRefs.current.monsterRotateAnim.interpolate({
                inputRange: [-0.1, 0, 0.1],
                outputRange: ["-10deg", "0deg", "10deg"],
              }),
            },
            { scale: animRefs.current.monsterScaleAnim },
          ],
        },
      ]}
    >
      <Image
        source={getMonsterImage(monster.name)}
        style={[styles.monster, styles.monsterShadow]}
      />
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
  monsterShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 12,
  },
});
