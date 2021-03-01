import { useContext, useEffect } from 'react';

import { ChallengeContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, experienceToLevelUp } = useContext(ChallengeContext);

  const barPercentage = Math.round((currentExperience * 100)/ experienceToLevelUp);

  return(
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div> 
        <div style={{ width: `${barPercentage}%` }} />
        <span className={styles.currentExperience} style={{ left: '50%' }}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToLevelUp} xp</span>
    </header>
  )
}