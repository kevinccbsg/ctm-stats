import { Select, Typography } from "antd";
import MainContainer from "../../Layouts/MainContainer/MainContainer";
import { LifeTimeStatistic, lifetimeStats, yearStats } from "../../api";
import { useState } from "react";
import LifetimeStats from "../../components/LifetimeStatsTable/LifetimeStatsTable";

const CustomLeaderboards = () => {
  const [year, setYear] = useState<number>(0);
  const [statOption, setStatOption] = useState<LifeTimeStatistic>(LifeTimeStatistic.WINNING_PERCENTAGE);

  const prefix = statOption === LifeTimeStatistic.WINNING_PERCENTAGE ? '%' : '';
  const title = `${year || ''} ${statOption}`;
  return (
    <MainContainer>
      <Typography.Title level={1}>Custom Leaderboard</Typography.Title>
      <Select
        style={{ width: 250 }}
        onChange={value => setStatOption(value)}
        value={statOption}
        options={[
          { value: LifeTimeStatistic.WINNING_PERCENTAGE, label: 'Winning %' },
          { value: LifeTimeStatistic.TOTAL_GAMES, label: 'Games' },
          { value: LifeTimeStatistic.MAXOUT_GAMES, label: 'Maxouts' },
        ]}
      />
      <Select
        style={{ width: 250 }}
        value={year}
        onChange={value => setYear(value)}
        options={[
          { value: 0, label: 'Lifetime' },
          { value: 2023, label: '2023' },
          { value: 2022, label: '2022' },
          { value: 2021, label: '2021' },
          { value: 2020, label: '2020' },
          { value: 2019, label: '2019' },
          { value: 2018, label: '2018' },
          { value: 2017, label: '2017' },
        ]}
      />
      {year === 0 && (
        <LifetimeStats
          title={title}
          getStatsMethod={() => lifetimeStats(statOption)}
        />
      )}
      {year !== 0 && (
        <LifetimeStats
          title={title}
          getStatsMethod={() => yearStats(statOption, year, prefix)}
        />
      )}
    </MainContainer>
  );
};

export default CustomLeaderboards;
