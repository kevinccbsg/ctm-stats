import { useEffect, useState } from 'react';
import ScoreTable from '../ScoreTable/ScoreTable';
import { message } from 'antd';

interface DataType {
  key: React.Key;
  id: number;
  image: string | null;
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
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    getStatsMethod()
      .then(values => {
        setData(values.map(value => ({
          ...value,
          key: value.id,
        })));
      })
      .catch(() => {
        messageApi.open({
          type: 'error',
          content: 'Error fetching results'
        });
      });
  }, [getStatsMethod, messageApi]);
  return (
    <>
      {contextHolder}
      <ScoreTable title={title} data={data} />
    </>
  );
};

export default ScoreTableRetriever;
