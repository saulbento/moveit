import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengeProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface ChallengeProps {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeContextData {
  level: number;
  challengesCompleted: number;
  currentExperience: number;
  activeChallenge: ChallengeProps;
  experienceToLevelUp: number;
  newChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: (gainedExperience: number) => void;
  handleCloseLevelUpModal: () => void;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({children, ...rest}: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [levelUpModalActive, setLevelUpModalActive] = useState(false);
  
  const experienceToLevelUp = Math.pow(((level + 1) * 4), 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))

  } , [level, currentExperience, challengesCompleted])

  function newChallenge() {
    const challengeIndex =  Math.floor(Math.random() * challenges.length)
    const challenge = challenges[challengeIndex]
    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio!', {
        body: `Valendo ${challenge.amount}xp`
      })
    }
  }

  function handleCloseLevelUpModal() {
    setLevelUpModalActive(false)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge(gainedExperience: number) {
    if ((currentExperience + gainedExperience) >= experienceToLevelUp ) {
      setLevel(level + 1)
      setCurrentExperience(currentExperience + gainedExperience - experienceToLevelUp)
      setLevelUpModalActive(true)

    } else {
      setCurrentExperience(currentExperience + gainedExperience)
    }
    setChallengesCompleted(challengesCompleted + 1)
    resetChallenge()
  }


  return(
    <ChallengeContext.Provider 
      value={{
        level, 
        challengesCompleted, 
        currentExperience, 
        activeChallenge,
        newChallenge,
        resetChallenge,
        experienceToLevelUp,
        completeChallenge,
        handleCloseLevelUpModal
      }}>
        {children}
        {levelUpModalActive && <LevelUpModal />}
    </ChallengeContext.Provider>
  )
}