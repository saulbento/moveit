import {useContext, useState, useEffect} from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';



export function Countdown() {
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    startCoundown,
    resetCountdown 
  } = useContext(CountdownContext);

  const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');
  
  return(
    <div>
    <div className={styles.countdownContainer}>
      <div>
        <span>{minutesLeft}</span>
        <span>{minutesRight}</span>
      </div>
      <span>:</span>
      <div>
        <span>{secondsLeft}</span>
        <span>{secondsRight}</span>
      </div>
    </div>
    {hasFinished ? (
        <button 
          disabled
          className={styles.countdownButton}
        >
          Ciclo Encerrado
        </button>
    ) : (
          <>
            {isActive ? (    
              <button 
                type="button"
                className={`${styles.countdownButtonActive} ${styles.countdownButton} `}
                onClick={resetCountdown}
              >
                Abandonar ciclo
              </button>
            ) : (
            <button 
                type="button"
                className={styles.countdownButton}
                onClick={startCoundown}
              >
                Iniciar um ciclo
              </button>
            )
          }
        </>
      ) 
    }
    </div>

  )
}