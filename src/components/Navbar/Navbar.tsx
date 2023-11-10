import { Image, Menu } from 'antd';
import styles from './Navbar.module.scss';
import { BarChartOutlined, DatabaseOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../assets/ctm_logo.png';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <Menu mode="horizontal" className={styles.menu}>
        <Menu.Item key="logo" className={styles.imageContainer}>
          <Link to={ROUTES.HOME}>
            <Image preview={false} src={logo} className={styles.image} />
          </Link>
        </Menu.Item>
        <Menu.Item key="1" icon={<BarChartOutlined />}>
          <Link to={ROUTES.LATEST_LEADERBOARDS}>
            2023 Leaderboards
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DatabaseOutlined />}>
          <Link to={ROUTES.LATEST_LEADERBOARDS}>
            Custom Leaderboards
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to={ROUTES.LATEST_LEADERBOARDS}>
            Player profiles
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<TeamOutlined />}>
          <Link to={ROUTES.LATEST_LEADERBOARDS}>
            Player vs Player
          </Link>
        </Menu.Item>
      </Menu>
    </header>
  );
};

export default Navbar;
