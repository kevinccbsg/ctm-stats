import { Image, Typography } from 'antd';
import { getScores, EScores, LifeTimeStatistic, lifetimeStats } from '../../api';
import logo from '../../assets/ctm_logo.png';
import styles from './Home.module.scss';
import LifetimeStats from '../../components/LifetimeStatsTable/LifetimeStatsTable';
import ScoreTable from '../../components/ScoreTable/ScoreTable';

const Homepage = () => {
  return (
    <div>
      <Image preview={false} src={logo} />
      <Typography.Paragraph>Explore the different sheet pages for 2023 Leaderboards, Player Profiles, Player vs Player Comparisons, Month Stats, & Marframs in-depth Player Stats!</Typography.Paragraph>
      <Typography.Paragraph>Main Contributors: aGameScout, Marfram, HydrantDude | Special Thanks: Pumpyheart, Fractal161, DanQZ, vandweller, Lok & everyone whos helped improve the sheet</Typography.Paragraph>
      <Typography.Paragraph>Discuss this sheet, post your statistical findings or give feedback in the https://ctm.gg/discord CTM discord server under the #Match-Statistics channel</Typography.Paragraph>
      <div className={styles.container}>
        <ScoreTable
          title="All Time High Score, Faster Masters"
          getStatsMethod={() => getScores(EScores.FINAL_SCORE)}
        />
        <ScoreTable
          title="All Time Highest Level 19 Transition Score"
          getStatsMethod={() => getScores(EScores.TRANSITION_19_SCORE)}
        />
        <ScoreTable
          title="All Time Highest Level 29 Transition Score"
          getStatsMethod={() => getScores(EScores.TRANSITION_29_SCORE)}
        />
        <LifetimeStats
          title="Lifetime Winning Percentage"
          getStatsMethod={() => lifetimeStats(LifeTimeStatistic.WINNING_PERCENTAGE, '%')}
        />
        <LifetimeStats
          title="Lifetime Total Games"
          getStatsMethod={() => lifetimeStats(LifeTimeStatistic.TOTAL_GAMES)}
        />
        <LifetimeStats
          title="Lifetime Total Maxouts"
          getStatsMethod={() => lifetimeStats(LifeTimeStatistic.MAXOUT_GAMES)}
        />
      </div>
    </div>
  );
};

export default Homepage;
