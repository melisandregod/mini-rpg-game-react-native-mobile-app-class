const classes = {
  Knight: {
    hp: 150,
    mp: 30,
    atk: 10,
    def: 15,
    icon: require("../assets/characters/knight.png"),
    description: "นักรบสายแทงค์ ป้องกันสูง เหมาะกับการรับดาเมจ",
  },
  Mage: {
    hp: 80,
    mp: 100,
    atk: 18,
    def: 5,
    icon: require("../assets/characters/Mage.png"),
    description: "นักเวทใช้เวทโจมตีรุนแรง แต่ตัวบาง",
  },
  Assassin: {
    hp: 100,
    mp: 50,
    atk: 20,
    def: 8,
    icon: require("../assets/characters/Assassin.png"),
    description: "มือสังหารโจมตีเร็วและแรง เหมาะกับการจบไว",
  },
};

export default classes;
