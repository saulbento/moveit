import { useContext } from 'react';

import { ChallengeContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengeContext);
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/saulbento.png" alt="Saul Bento" />
      <div>
        <strong>Saul Bento</strong>
        <p>
          <img src="icons/level.svg" alt="levelup" />
          Level {level}</p>
      </div>
    </div>
  )
}