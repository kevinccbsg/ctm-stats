import { Avatar, Image, List, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { getScores, lifeTimeMaxouts, Scores } from '../../api';
import logo from '../../assets/ctm_logo.png';
import styles from './Home.module.scss';

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
    lifeTimeMaxouts()
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
    <div>
      <Image preview={false} src={logo} />
      <Typography.Paragraph>Explore the different sheet pages for 2023 Leaderboards, Player Profiles, Player vs Player Comparisons, Month Stats, & Marframs in-depth Player Stats!</Typography.Paragraph>
      <Typography.Paragraph>Main Contributors: aGameScout, Marfram, HydrantDude | Special Thanks: Pumpyheart, Fractal161, DanQZ, vandweller, Lok & everyone whos helped improve the sheet</Typography.Paragraph>
      <Typography.Paragraph>Discuss this sheet, post your statistical findings or give feedback in the https://ctm.gg/discord CTM discord server under the #Match-Statistics channel</Typography.Paragraph>
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
    </div>
  );
};

export default Homepage;
