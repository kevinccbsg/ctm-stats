import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from './MatchupProfile.module.scss';

interface Player {
  id: number;
  name: string;
  profile_picture_url: string | null;
}

interface Props {
  player: Player;
  opponent: Player;
}

const MatchupProfile = ({ player, opponent }: Props) => {
  return (
    <div className={styles.container}>
      <div>
        <Typography.Title level={3}>{player.name}</Typography.Title>
        <Avatar
          size={130}
          src={player.profile_picture_url || null}
          icon={<UserOutlined />}
        />
      </div>
      <div>
        <Typography.Title level={3}>{opponent.name}</Typography.Title>
        <Avatar
          size={130}
          src={opponent.profile_picture_url || null}
          icon={<UserOutlined />}
        />
      </div>
    </div>
  );
};

export default MatchupProfile;
