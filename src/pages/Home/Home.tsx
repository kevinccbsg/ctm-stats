import { Typography } from 'antd';
import { getScores, EScores, LifeTimeStatistic, lifetimeStats } from '../../api';
import LifetimeStats from '../../components/LifetimeStatsTable/LifetimeStatsTable';
import ScoreTableRetriever from '../../components/ScoreTableRetriever/ScoreTableRetriever';
import MainContainer from '../../Layouts/MainContainer/MainContainer';
import StatsGrid from '../../Layouts/StatsGrid/StatsGrid';

const Homepage = () => {
  return (
    <MainContainer>
      <Typography.Title level={1}>All Time CTM Masters Event Leaderboards</Typography.Title>
      <StatsGrid>
        <ScoreTableRetriever
          title="All Time High Score, Faster Masters"
          getStatsMethod={() => getScores(EScores.FINAL_SCORE)}
        />
        <ScoreTableRetriever
          title="All Time Highest Level 19 Transition Score"
          getStatsMethod={() => getScores(EScores.TRANSITION_19_SCORE)}
        />
        <ScoreTableRetriever
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
      </StatsGrid>
    </MainContainer>
  );
};

export default Homepage;
