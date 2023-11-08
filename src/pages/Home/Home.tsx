import { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import styles from './Home.module.scss';
import { getScores, Scores } from '../../api';
import { Avatar, List, Typography } from 'antd';

interface Score {
  id: number;
  final_score: number | null;
  game_link: string | null;
  players: {
    id: number;
    name: string | null;
    profile_picture_url: string | null;
    twitch_url: string | null;
  } | null;
}

const Homepage = () => {
  const [scores, setScore] = useState<Score[]>([]);
  useEffect(() => {
    getScores(Scores.TRANSITION_29_SCORE)
      .then(data => {
      console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
    getScores(Scores.FINAL_SCORE)
      .then(data => {
        if (data) {
          setScore(data as Score[]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div className={styles.container}>
      <List
        loading={false}
        itemLayout="horizontal"
        dataSource={scores}
        renderItem={(score) => (
          <List.Item
            actions={[<a href={score.game_link as string} target='blank' rel='noopener' key="youtube-link">Video</a>]}
          >
            <List.Item.Meta
              avatar={<Avatar src={score.players?.profile_picture_url ? score.players.profile_picture_url : <UserOutlined />} />}
              title={<Typography.Paragraph>{score.players?.name}</Typography.Paragraph>}
              description={<Typography.Paragraph>{score.final_score}</Typography.Paragraph>}
            />
            <div>{score.final_score}</div>
          </List.Item>
        )}
    />
    </div>
  );
};

export default Homepage;
