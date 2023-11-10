import { Typography } from "antd";
import MainContainer from "../../Layouts/MainContainer/MainContainer";
import StatsGrid from "../../Layouts/StatsGrid/StatsGrid";
import { LifeTimeStatistic, yearStats } from "../../api";
import LifetimeStats from "../../components/LifetimeStatsTable/LifetimeStatsTable";

const currentYear = new Date().getFullYear();

const LatestLeaderboards = () => (
  <MainContainer>
    <Typography.Title level={1}>{currentYear} CTM Masters Event Leaderboards</Typography.Title>
    <StatsGrid>
      <LifetimeStats
        title="Lifetime Winning Percentage"
        getStatsMethod={() => yearStats(LifeTimeStatistic.WINNING_PERCENTAGE, currentYear, '%')}
      />
      <LifetimeStats
        title="Lifetime Total Games"
        getStatsMethod={() => yearStats(LifeTimeStatistic.TOTAL_GAMES, currentYear)}
      />
      <LifetimeStats
        title="Lifetime Total Maxouts"
        getStatsMethod={() => yearStats(LifeTimeStatistic.MAXOUT_GAMES, currentYear)}
      />
    </StatsGrid>
  </MainContainer>
);

export default LatestLeaderboards;
