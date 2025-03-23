import { Animated, Image, StyleSheet } from "react-native";

export default function CharacterDisplay({ player, animRefs }) {
  const getCharacterImage = (className) => {
    switch (className) {
        case "Assassin":
        return require("../../assets/characters/Assassin.png");
        case "Mage":
        return require("../../assets/characters/Mage.png");
      case "Knight":
        return require("../../assets/characters/knight.png");
      default:
        return require("../../assets/characters/knight.png");
    }
  };

  return (
    <Animated.View
      style={[
        styles.characterContainer,
        {
          opacity: animRefs.current.playerFadeAnim,
          transform: [
            {
              translateX: Animated.add(
                Animated.multiply(animRefs.current.playerIdleAnim, 4),
                animRefs.current.playerAttackAnim
              ),
            },
            { translateY: animRefs.current.playerJumpAnim },
            {
              rotate: animRefs.current.playerRotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
            { scale: animRefs.current.playerScaleAnim },
          ],
        },
      ]}
    >
      <Animated.Image
        source={getCharacterImage(player.class)}
        style={[
          styles.character, 
          styles.characterShadow
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  characterContainer: {
    alignItems: "center",
  },
  character: {
    width: 160,
    height: 160,
  },
  characterShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8, // สำหรับ Android
  }
});