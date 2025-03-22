import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [player, setPlayer] = useState(null); // ตัวละครผู้เล่น
  const [battleResult, setBattleResult] = useState(null); // ผลแพ้/ชนะ
  const [monster, setMonster] = useState(null); // มอนสเตอร์ที่สู้ด้วย

  return (
    <GameContext.Provider value={{
      player, setPlayer,
      battleResult, setBattleResult,
      monster, setMonster
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
