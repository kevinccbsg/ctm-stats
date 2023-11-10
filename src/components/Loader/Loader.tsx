import styles from './Loader.module.scss';

const Loader = () => (
  <div className={styles.tetris}>
    <div className={styles.block1} />
    <div className={styles.block2} />
    <div className={styles.block3} />
    <div className={styles.block4} />
  </div>
);

export default Loader;
