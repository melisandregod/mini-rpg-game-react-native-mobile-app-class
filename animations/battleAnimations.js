// animations/battleAnimations.js
import { Animated, Easing } from "react-native";

export function startIdleAnimations(refs) {
  Animated.loop(
    Animated.sequence([
      Animated.timing(refs.current.playerIdleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.playerIdleAnim, {
        toValue: 0,
        duration: 1200,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
    ])
  ).start();

  Animated.loop(
    Animated.sequence([
      Animated.timing(refs.current.monsterIdleAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.monsterIdleAnim, {
        toValue: 0,
        duration: 1500,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
    ])
  ).start();
}

export function animatePlayerAttack(refs, onComplete) {
  refs.current.playerAttackAnim.setValue(0);
  Animated.sequence([
    Animated.timing(refs.current.playerAttackAnim, {
      toValue: -10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(refs.current.playerAttackAnim, {
      toValue: 60,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),
    Animated.timing(refs.current.playerAttackAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }),
  ]).start(() => {
    onComplete && onComplete();
  });
}

export function animatePlayerSkill(refs, skill, onComplete) {
  refs.current.playerJumpAnim.setValue(0);
  refs.current.playerScaleAnim.setValue(1);
  Animated.sequence([
    Animated.parallel([
      Animated.timing(refs.current.playerScaleAnim, {
        toValue: 1.15,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.playerJumpAnim, {
        toValue: -15,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]),
    Animated.delay(200),
    Animated.timing(refs.current.playerScaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start(() => {
    onComplete && onComplete();
  });
}

export function animateMonsterAttack(refs, onComplete) {
  refs.current.monsterAttackAnim.setValue(0);
  refs.current.monsterJumpAnim.setValue(0);
  Animated.sequence([
    Animated.timing(refs.current.monsterAttackAnim, {
      toValue: 10,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.parallel([
      Animated.timing(refs.current.monsterAttackAnim, {
        toValue: -70,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(refs.current.monsterJumpAnim, {
          toValue: -15,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(refs.current.monsterJumpAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]),
    Animated.timing(refs.current.monsterAttackAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }),
  ]).start(() => {
    onComplete && onComplete();
  });
}

export function shakeMonster(refs) {
  refs.current.monsterShakeAnim.setValue(0);
  refs.current.monsterScaleAnim.setValue(1);
  refs.current.monsterRotateAnim.setValue(0);
  Animated.parallel([
    Animated.sequence([
      Animated.timing(refs.current.monsterShakeAnim, {
        toValue: 15,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.monsterShakeAnim, {
        toValue: -15,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.monsterShakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.monsterShakeAnim, {
        toValue: -5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.monsterShakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]),
    Animated.sequence([
      Animated.timing(refs.current.monsterScaleAnim, {
        toValue: 1.1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.monsterScaleAnim, {
        toValue: 0.9,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.monsterScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]),
    Animated.sequence([
      Animated.timing(refs.current.monsterRotateAnim, {
        toValue: 0.05,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.monsterRotateAnim, {
        toValue: -0.05,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.monsterRotateAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]),
  ]).start();
}

export function flashPlayer(refs) {
  refs.current.playerFadeAnim.setValue(1);
  refs.current.playerJumpAnim.setValue(0);
  Animated.parallel([
    Animated.sequence([
      Animated.timing(refs.current.playerFadeAnim, {
        toValue: 0.4,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.playerFadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.playerFadeAnim, {
        toValue: 0.6,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.playerFadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]),
    Animated.sequence([
      Animated.timing(refs.current.playerJumpAnim, {
        toValue: -15,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(refs.current.playerJumpAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]),
  ]).start();
}
