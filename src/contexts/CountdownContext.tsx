import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

import { ChallengeContext} from './ChallengesContext';

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountdownProps {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCoundown: () => void;
  resetCountdown: () => void;
}

let countdownTimeOut: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownProps);

export function CountdownProvider({children}: CountdownProviderProps) {
  const { newChallenge, activeChallenge } = useContext(ChallengeContext);

  const [timer, setTimer] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  function startCoundown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeOut);
    setIsActive(false);
    setTimer(0.1 * 60);
  }

  useEffect(() => {
    if (isActive && timer > 0) {
      countdownTimeOut = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000)
    } else if ( isActive && timer === 0) {
      setIsActive(false);
      setHasFinished(true);
      newChallenge();
    } 
  }, [isActive, timer])

  useEffect(() => {
    if (!activeChallenge) {
      resetCountdown();
      setHasFinished(false);
    }

  }, [activeChallenge])

  return(
    <CountdownContext.Provider value={{minutes, seconds, startCoundown, hasFinished, isActive, resetCountdown}}>
      {children}
    </CountdownContext.Provider>
  )
}