// components/battle/CharacterDisplay.js
import { Animated, Image, StyleSheet } from "react-native";

export default function CharacterDisplay({ player, animRefs }) {
  const getCharacterImage = (className) => {
    switch (className) {
      case "Knight":
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
            { translateX: animRefs.current.playerAttackAnim },
            { translateY: Animated.add(animRefs.current.playerJumpAnim, animRefs.current.playerIdleAnim) },
            { rotate: animRefs.current.playerRotateAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] }) },
            { scale: animRefs.current.playerScaleAnim },
          ],
        },
      ]}
    >
      <Image source={getCharacterImage(player.class)} style={styles.character} />
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
});
