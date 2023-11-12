import { ReactNode } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './MainContainer.module.scss';

interface Props {
  children: ReactNode | ReactNode[];
}

const MainContainer = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
