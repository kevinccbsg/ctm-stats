import { Image, Menu, MenuProps } from 'antd';
import styles from './Navbar.module.scss';
import { BarChartOutlined, DatabaseOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../assets/ctm_logo.png';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const items: MenuProps['items'] = [
  {
    label: (
      <Link to={ROUTES.HOME} className={styles.imageContainer}>
        <Image preview={false} src={logo} className={styles.image} />
      </Link>
    ),
    key: 'logo',
  },
  {
    label: (
      <Link to={ROUTES.LATEST_LEADERBOARDS}>
        2023 Leaderboards
      </Link>
    ),
    icon: <BarChartOutlined />,
    key: '1',
  },
  {
    label: (
      <Link to={ROUTES.CUSTOM_LEADERBOARDS}>
        Custom Leaderboards
      </Link>
    ),
    icon: <DatabaseOutlined />,
    key: '2',
  },
  {
    label: (
      <Link to={ROUTES.PLAYER_PROFILE}>
        Player profiles
      </Link>
    ),
    icon: <UserOutlined />,
    key: '3',
  },
  {
    label: (
      <Link to={ROUTES.PLAYER_VS_PLAYER}>
        Player vs Player
      </Link>
    ),
    icon: <TeamOutlined />,
    key: '4',
  },
]

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <Menu mode="horizontal" className={styles.menu} items={items} />
    </header>
  );
};

export default Navbar;
