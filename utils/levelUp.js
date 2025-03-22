const statGrowth = {
    Knight:   { hp: 20, mp: 5, atk: 2, def: 2 },
    Mage:     { hp: 10, mp: 15, atk: 3, def: 1 },
    Assassin: { hp: 12, mp: 8, atk: 4, def: 1 },
  };
  
  export function levelUp(player) {
    const growth = statGrowth[player.class];
  
    const newMaxHP = player.maxHP + growth.hp;
    const newMaxMP = player.maxMP + growth.mp;
  
    return {
      ...player,
      level: player.level + 1,
      atk: player.atk + growth.atk,
      def: player.def + growth.def,
      maxHP: newMaxHP,
      maxMP: newMaxMP,
      hp: newMaxHP,   // ✅ ฟื้นเต็ม
      mp: newMaxMP,   // ✅ ฟื้นเต็ม
    };
  }
  