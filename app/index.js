import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useGame } from '../context/GameContext';
import MenuBackground from '../components/MenuBackground';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const { player } = useGame();
  const [titleScale] = useState(new Animated.Value(1));
  const [backgroundOpacity] = useState(new Animated.Value(0.3));

  useEffect(() => {
    // Title pulsing animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(titleScale, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(titleScale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ])
    );

    // Background opacity animation
    const backgroundAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundOpacity, {
          toValue: 0.5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        })
      ])
    );

    pulseAnimation.start();
    backgroundAnimation.start();

    return () => {
      pulseAnimation.stop();
      backgroundAnimation.stop();
    };
  }, []);

  return (
    <SafeAreaView style={{flex : 1}}>
    <MenuBackground/>
      <Animated.View 
        style={[
          styles.overlay, 
          { 
            opacity: backgroundOpacity,
            backgroundColor: '#000' 
          }
        ]}
      />
      
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(40,40,40,0.5)', 'rgba(40,40,40,0.5)']}
          style={styles.glassContainer}
        >
          <Animated.View 
            style={[
              styles.titleContainer, 
              { 
                transform: [{ 
                  scale: titleScale 
                }] 
              }
            ]}
          >
            <Text style={styles.titleText}>Mini RPG Chronicle</Text>
          </Animated.View>

          <View style={styles.playerInfoContainer}>
            <Text style={styles.playerInfoText}>
              {player 
                ? `${player.class}` 
                : 'ยังไม่มีตัวละคร'}
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/character-creation')}
          >
            <LinearGradient
              colors={['#50C878','#355E3B']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {player ? 'เลือกอาชีพใหม่' : 'สร้างตัวละคร'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {player && (
            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => router.push('/battle-ui-demo')}
            >
              <LinearGradient
                colors={['#50C878','#355E3B']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>เริ่มการผจญภัย</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </LinearGradient>
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  glassContainer: {
    width: '90%',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  titleText: {
    fontFamily: '8bit',
    fontSize: 29,
    fontWeight: 'bold',
    color: '#50C878',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center',
  },
  playerInfoContainer: {
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  playerInfoText: {
    fontFamily: '8bitTH',
    color: '#ecf0f1',
    fontSize: 25,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  startButton: {
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: '8bitTH',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});