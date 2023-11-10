import { ReactNode } from 'react';
import styles from './StatsGrid.module.scss';

interface Props {
  children: ReactNode | ReactNode[];
}

const StatsGrid = ({ children }: Props) => {
  return (
    <div className={styles.statsContainer}>
      {children}
    </div>
  );
};

export default StatsGrid;
