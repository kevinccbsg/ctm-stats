import { useEffect, useState } from 'react';
import StatTable from '../../common/StatTable/StatTable';

interface Score {
  id: number;
  name: string;
  value: string;
}

interface Props {
  title: string;
  getStatsMethod: () => Promise<Score[]>;
}

const LifetimeStats = ({ getStatsMethod, title }: Props) => {
  const [scores, setScore] = useState<Score[]>([]);
  useEffect(() => {
    getStatsMethod()
      .then(values => {
        setScore(values);
      })
      .catch(error => {
        console.log(error);
      });
  }, [getStatsMethod]);
  return (
    <StatTable
      title={title}
      data={scores}
    />
  );
};

export default LifetimeStats;
