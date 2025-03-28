# 🧙 Mini Turn-Based RPG (React Native + Expo)

A pixel-style mobile RPG built with **React Native** and **Expo Router**. Choose a class, fight monsters in turn-based combat, cast skills, use items, and level up your hero!


## 🔥 Features

- Choose your class: Knight, Mage, or Assassin
- Stats system: HP, MP, ATK, DEF, EXP, Level, Skills
- Turn-based battles with random monsters
- Use skills or items with animated effects
- Earn EXP and level up to grow stronger
- Simple pixel-style UI with smooth animations
- Game state managed via Context API (Firebase support planned)

---

## 🛠 Project Structure

```
project-root/
├── app/
│   ├── index.js               # Home screen
│   ├── profile.js             # Character profile screen
│   ├── character-creation.js  # Choose a class
│   ├── battle.js              # Turn-based battle screen
│   ├── result.js              # Post-battle result screen
│   └── _layout.js             # Global layout with font loading
├── components/
│   ├── battle/                # Battle-related UI components
│   │   ├── ActionMenu.js
│   │   ├── BattleLog.js
│   │   ├── CharacterDisplay.js
│   │   ├── MonsterDisplay.js
│   │   ├── ItemMenu.js
│   │   └── SkillMenu.js
│   ├── StatusBar.js
│   ├── BattleBackground.js
│   └── MenuBackground.js
├── context/
│   └── GameContext.js         # Global game state context
├── data/
│   ├── classes.js             # Class base stats
│   ├── skills.js              # Class skills
│   ├── items.js               # Usable items
│   └── monsters.js            # Random enemy data
├── utils/
│   ├── levelUp.js             # Handle stat growth on level up
│   └── battleUtils.js         # Misc. helper functions
├── assets/                    # Character sprites, monster images, backgrounds, fonts
└── README.md
```

---

## ⚙️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the project

```bash
npx expo start
```

---

## 🧪 Gameplay Notes

- Create a character and start your first battle
- Try using skills and items with MP/HP animations
- When EXP reaches 100, the character levels up and gains stats

---

## 🚀 Future Enhancements

- ✅ Firebase Auth + Firestore integration
- ✅ Quests, storyline, and shops
- ✅ Leaderboard or daily challenges
- ✅ Multiplayer PvP or raid bosses

---

## 📦 Assets

- Fonts: `TA8bit.ttf`, `Daydream.ttf`
- Static PNGs for characters, monsters, backgrounds
- All assets are located in `assets/`

---

## 👤 Developer Notes

- Final project for Mobile Development class


---

> **Mini RPG Chronicle** — train, fight, and grow! ⚔️
