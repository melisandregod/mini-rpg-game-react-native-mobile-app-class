import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  Image,
  ScrollView 
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { useGame } from "../context/GameContext";
import { Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import MenuBackground from "../components/MenuBackground";

export default function Profile() {
  const { player } = useGame();
  const screenWidth = Dimensions.get("window").width;

  if (!player) {
    return (
      <ImageBackground
        source={require('../assets/backgrounds/menu.png')}
        style={styles.backgroundContainer}
        blurRadius={3}
      >
        <View style={styles.overlay} />
        <View style={styles.noCharacterContainer}>
          <Text style={styles.warningText}>ยังไม่มีตัวละคร</Text>
          <TouchableOpacity
            style={styles.returnButton}
            onPress={() => router.replace("/character-creation")}
          >
            <LinearGradient
              colors={['#e74c3c', '#c0392b']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>กลับไปเลือกอาชีพ</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <SafeAreaView style={{flex : 1}}>
    <MenuBackground/>
     <TouchableOpacity
              onPress={() => router.replace("/")}
              style={styles.backButton}
            >
              <Text style={styles.backText}>กลับ</Text>
            </TouchableOpacity>
      <View style={styles.overlay} />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileContainer}>
          <LinearGradient
            colors={['rgba(30, 30,30,0.8)', 'rgba(30, 30,30,0.8)']}
            style={styles.characterCard}
          >
            <View style={styles.characterHeader}>
              <View style={styles.characterIconContainer}>
                <Image 
                  source={player.icon} 
                  style={styles.characterIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.characterInfo}>
                <Text style={styles.characterName}>{player.class}</Text>
                <Text style={styles.levelText}>Level {player.level}</Text>
              </View>
            </View>

            <View style={styles.statContainer}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>EXP:</Text>
                <View style={styles.expBarContainer}>
                  <View 
                    style={[
                      styles.expBar, 
                      { width: `${player.exp}%`, backgroundColor: '#2ecc71' }
                    ]}
                  />
                </View>
                <Text style={styles.statValue}>{player.exp} / 100</Text>
              </View>

              <View style={styles.statRow}>
                <Text style={styles.statLabel}>HP:</Text>
                <View style={styles.hpBarContainer}>
                  <View 
                    style={[
                      styles.hpBar, 
                      { 
                        width: `${(player.hp / player.maxHP) * 100}%`, 
                        backgroundColor: '#e74c3c' 
                      }
                    ]}
                  />
                </View>
                <Text style={styles.statValue}>{player.hp} / {player.maxHP}</Text>
              </View>

              <View style={styles.statRow}>
                <Text style={styles.statLabel}>MP:</Text>
                <View style={styles.mpBarContainer}>
                  <View 
                    style={[
                      styles.mpBar, 
                      { 
                        width: `${(player.mp / player.maxMP) * 100}%`, 
                        backgroundColor: '#3498db' 
                      }
                    ]}
                  />
                </View>
                <Text style={styles.statValue}>{player.mp} / {player.maxMP}</Text>
              </View>
            </View>

            <View style={styles.additionalStatsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statBoxLabel}>ATK</Text>
                <Text style={styles.statBoxValue}>{player.atk}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statBoxLabel}>DEF</Text>
                <Text style={styles.statBoxValue}>{player.def}</Text>
              </View>
            </View>
          </LinearGradient>

          <TouchableOpacity 
            style={styles.battleButton}
            onPress={() => router.push("/battle")}
          >
            <LinearGradient
              colors={['#50C878','#355E3B']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>เริ่ม Battle!</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    width: '100%',
  },
  characterCard: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  characterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  characterIconContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    overflow: 'hidden'
  },
  characterIcon: {
    width: 100,
    height: 100,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontFamily: '8bitTH',
    fontSize: 34,
    fontWeight: 'bold',
    color: '#ecf0f1',
  },
  levelText: {
    fontFamily: '8bitTH',
    fontSize: 24,
    color: '#bdc3c7',
  },
  statContainer: {
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statLabel: {
    fontFamily: '8bitTH',
    color: '#ecf0f1',
    marginRight: 10,
    width: 40,
    fontSize: 19,
  },
  statValue: {
    fontFamily: '8bitTH',
    color: '#bdc3c7',
    marginLeft: 10,
    width: 60,
    textAlign: 'right',
    fontSize: 15,
  },
  expBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  expBar: {
    height: '100%',
  },
  hpBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  hpBar: {
    height: '100%',
  },
  mpBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  mpBar: {
    height: '100%',
  },
  additionalStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 10,
    width: '48%',
    alignItems: 'center',
  },
  statBoxLabel: {
    fontFamily: '8bitTH',
    color: '#bdc3c7',
    fontSize: 18,
    marginBottom: 5,
  },
  statBoxValue: {
    fontFamily: '8bitTH',
    color: '#ecf0f1',
    fontSize: 20,
  },
  battleButton: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: '8bitTH',
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  noCharacterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  warningText: {
    fontSize: 24,
    color: '#e74c3c',
    marginBottom: 20,
  },
  returnButton: {
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  backButton: {
    position: "absolute",
    top: 70,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    borderRadius: 8,
    zIndex: 10,
  },
  backText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: '8bitTH',
  },
});