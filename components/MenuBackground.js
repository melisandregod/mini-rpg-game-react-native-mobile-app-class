import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const MenuBackground = () => {
  // Animated values for background effects
  const layer1Anim = useRef(new Animated.Value(0)).current;
  const particleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Parallax animation for background layers
    const layerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(layer1Anim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(layer1Anim, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    );

    // Particle animation
    const particleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(particleAnim, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(particleAnim, {
          toValue: 0,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    );

    layerAnimation.start();
    particleAnimation.start();

    return () => {
      layerAnimation.stop();
      particleAnimation.stop();
    };
  }, []);

  // Interpolations for animations
  const layerTransform = layer1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const particleTransform = particleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  // Render particles
  const renderParticles = () => {
    return [...Array(300)].map((_, index) => {
      const particleStyle = {
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: Math.random() * 5 + 1,
        height: Math.random() * 5 + 1,
        backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.6})`,
        borderRadius: 50,
        transform: [{ translateY: particleTransform }],
        opacity: Math.random() * 0.7
      };

      return (
        <Animated.View 
          key={index} 
          style={particleStyle}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/backgrounds/menu.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Fog overlay */}
        <Animated.View 
          style={[
            styles.fogOverlay,
            { 
              opacity: layer1Anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.1, 0.3]
              }),
              backgroundColor: 'rgba(50, 100, 50, 0.2)'
            }
          ]}
        />

        {/* Particle effects */}
        <View style={styles.particleContainer}>
          {renderParticles()}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  fogOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  particleContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
});

export default MenuBackground;