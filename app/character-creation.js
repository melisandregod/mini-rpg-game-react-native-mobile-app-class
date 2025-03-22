import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  ScrollView, 
  Image 
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { useGame } from "../context/GameContext";
import classes from "../data/classes";
import allSkills from "../data/skills";
import allItems from "../data/items";

export default function CharacterCreation() {
  const { setPlayer } = useGame();
  const [selectedClass, setSelectedClass] = useState(null);

  const chooseClass = (className) => {
    const baseStats = classes[className];

    const newPlayer = {
      name: className,
      class: className,
      level: 1,
      exp: 0,
      ...baseStats,
      hp: baseStats.hp,
      mp: baseStats.mp,
      maxHP: baseStats.hp,
      maxMP: baseStats.mp,
      skills: allSkills[className],
      inventory: [...allItems],
    };

    setPlayer(newPlayer);
    router.replace("profile");
  };

  const ClassCard = ({ className }) => {
    const classData = classes[className];
    const isSelected = selectedClass === className;

    return (
      <TouchableOpacity 
        style={[
          styles.classCard, 
          isSelected && styles.selectedClassCard
        ]}
        onPress={() => setSelectedClass(className)}
      >
        <LinearGradient
          colors={isSelected 
            ? ['#4a4a4a', '#2c3e50'] 
            : ['#34495e', '#2c3e50']
          }
          style={styles.cardGradient}
        >
          <View style={styles.classCardContent}>
            <View style={styles.classIconContainer}>
              <Image 
                source={classData.icon} 
                style={styles.classIcon} 
                resizeMode="contain"
              />
            </View>
            <View style={styles.classDetailsContainer}>
              <Text style={styles.className}>{className}</Text>
              <View style={styles.statContainer}>
                <Text style={styles.statText}>❤️ HP: {classData.hp}</Text>
                <Text style={styles.statText}>✨ MP: {classData.mp}</Text>
              </View>
              <Text style={styles.descriptionText}>
                {classData.description}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/backgrounds/forest.jpeg')}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>🌟 เลือกอาชีพของคุณ 🌟</Text>
        
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {Object.keys(classes).map((className) => (
            <ClassCard key={className} className={className} />
          ))}
        </ScrollView>

        <TouchableOpacity 
          style={[
            styles.confirmButton, 
            !selectedClass && styles.disabledButton
          ]}
          onPress={() => selectedClass && chooseClass(selectedClass)}
          disabled={!selectedClass}
        >
          <LinearGradient
            colors={selectedClass 
              ? ['#27ae60', '#2ecc71'] 
              : ['#95a5a6', '#7f8c8d']
            }
            style={styles.confirmButtonGradient}
          >
            <Text style={styles.confirmButtonText}>
              {selectedClass 
                ? `เลือก ${selectedClass}` 
                : 'เลือกอาชีพก่อน'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
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
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1c40f',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  classCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  selectedClassCard: {
    borderWidth: 2,
    borderColor: '#f1c40f',
  },
  cardGradient: {
    padding: 15,
  },
  classCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classIconContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
  },
  classIcon: {
    width: 80,
    height: 80,
  },
  classDetailsContainer: {
    flex: 1,
  },
  className: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 10,
  },
  statContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  statText: {
    color: '#bdc3c7',
    marginRight: 15,
    fontSize: 16,
  },
  descriptionText: {
    color: '#95a5a6',
    fontSize: 14,
  },
  confirmButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.6,
  },
  confirmButtonGradient: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});