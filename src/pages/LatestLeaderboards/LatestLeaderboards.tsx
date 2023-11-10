import { Typography } from "antd";
import MainContainer from "../../Layouts/MainContainer/MainContainer";
import StatsGrid from "../../Layouts/StatsGrid/StatsGrid";
import { LifeTimeStatistic, lifetimeStats } from "../../api";
import LifetimeStats from "../../components/LifetimeStatsTable/LifetimeStatsTable";

const LatestLeaderboards = () => (
  <MainContainer>
    <Typography.Title level={1}>2023 CTM Masters Event Leaderboards</Typography.Title>
    <StatsGrid>
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

export default LatestLeaderboards;
