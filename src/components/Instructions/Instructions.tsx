import styles from './Instructions.module.scss';

export const Instructions: React.FC<{ instructions: string }> = ({ instructions }) => {
  return (
    <div className={styles.instructions}>
      <h2 className={styles.instructions__title}>Instruction</h2>
      <p className={styles.instructions__text}>{instructions}</p>
    </div>
  );
};