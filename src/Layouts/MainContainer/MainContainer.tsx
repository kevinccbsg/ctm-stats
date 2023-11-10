import { ReactNode } from 'react';
import styles from './MainContainer.module.scss';
import Navbar from '../../components/Navbar/Navbar';

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
