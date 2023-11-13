import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getPlayers } from "../../../api";
import styles from './MatchupProfile.module.scss';

interface Props {
  playerId: number;
  opponentId: number;
}

interface Player {
  id: number;
  name: string;
  profile_picture_url: string | null;
}

interface InfoData {
  player: Player;
  opponent: Player;
}

const MatchupProfile = ({ playerId, opponentId }: Props) => {
  const [info, setInfo] = useState<InfoData | null>(null);
  useEffect(() => {
    getPlayers(playerId, opponentId)
      .then(players => {
        setInfo(players)
      })
      .catch(error => console.log(error))
  }, [playerId, opponentId]);

  return (
    <div>
      {info && (
        <div className={styles.container}>
          <div>
            <Typography.Title level={3}>{info.player.name}</Typography.Title>
            <Avatar
              size={130}
              src={info.player.profile_picture_url}
              icon={<UserOutlined />}
            />
          </div>
          <div>
            <Typography.Title level={3}>{info.opponent.name}</Typography.Title>
            <Avatar
              size={130}
              src={info.opponent.profile_picture_url}
              icon={<UserOutlined />}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchupProfile;
