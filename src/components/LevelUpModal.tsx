import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
  const { level, handleCloseLevelUpModal } = useContext(ChallengeContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabens</strong>
        <p>Voce alcancou um novo level.</p>

        <button type="button" onClick={handleCloseLevelUpModal}>
          <img src="/icons/close.svg" alt="Close Modal" />
        </button>
      </div>
    </div>
  )

} 