const skills = {
    Knight: [
      {
        name: 'Shield Bash',
        type: 'attack',
        power: 15,
        mpCost: 10,
        effect: 'stun', // ต่อยอดทีหลัง
      },
    ],
    Mage: [
      {
        name: 'Fireball',
        type: 'attack',
        power: 25,
        mpCost: 20,
      },
    ],
    Assassin: [
      {
        name: 'Poison Dart',
        type: 'attack',
        power: 18,
        mpCost: 15,
        effect: 'poison',
      },
    ],
  };
  
  export default skills;
  