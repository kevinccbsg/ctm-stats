import { useEffect, useState } from 'react';
import ScoreTable from '../ScoreTable/ScoreTable';

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  description: string;
  value: string;
  link: string | null;
}

interface Props {
  title: string;
  getStatsMethod: () => Promise<Omit<DataType, 'key'>[]>;
}

const ScoreTableRetriever = ({ getStatsMethod, title }: Props) => {
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    getStatsMethod()
      .then(values => {
        setData(values.map(value => ({
          ...value,
          key: value.id,
        })));
      })
      .catch(error => {
        console.log(error);
      });
  }, [getStatsMethod]);
  return (
    <ScoreTable title={title} data={data} />
  );
};

export default ScoreTableRetriever;
