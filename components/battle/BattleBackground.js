import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const BattleBackground = () => {
  // สร้าง Animated Values สำหรับเอฟเฟกต์
  const fogAnim = useRef(new Animated.Value(0)).current;
  const particleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // แอนิเมชันหมอก
    const fogAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(fogAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(fogAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    // แอนิเมชันอนุภาค
    const particleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(particleAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(particleAnim, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    );

    fogAnimation.start();
    particleAnimation.start();

    return () => {
      fogAnimation.stop();
      particleAnimation.stop();
    };
  }, []);

  // การแปลงพิกัดสำหรับเอฟเฟกต์
  const fogOpacity = fogAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.3],
  });

  const particleTransform = particleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  // สร้างอนุภาคกระจายทั่วหน้าจอ
  const renderParticles = () => {
    return [...Array(100)].map((_, index) => {
      const particleStyle = {
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: Math.random() * 5 + 2,
        height: Math.random() * 5 + 2,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 50,
        transform: [{ translateY: particleTransform }],
        opacity: Math.random() * 0.5
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
        source={require("../../assets/backgrounds/forest.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* เอฟเฟกต์หมอก */}
        <Animated.View 
          style={[
            styles.fogOverlay,
            { 
              opacity: fogOpacity,
              backgroundColor: 'rgba(50, 100, 50, 0.3)'  // เปลี่ยนเป็นสีเขียวอ่อนสอดคล้องกับป่า
            }
          ]}
        />

        {/* เอฟเฟกต์แสงสลัว */}
        <Animated.View 
          style={[
            styles.lightOverlay,
            { 
              backgroundColor: 'rgba(100, 255, 100, 0.1)',
              opacity: fogAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.1, 0.3, 0.1]
              })
            }
          ]}
        />

        {/* อนุภาคกระจาย */}
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
  lightOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  particleContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
});

export default BattleBackground;