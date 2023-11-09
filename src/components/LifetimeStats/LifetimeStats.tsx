import { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: number;
  name: string;
  value: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'name',
    key: 'name',
    render: (_val, _record, index) => <Typography.Text strong style={{ color: '#20e128'}}>{index + 1}</Typography.Text>,
  },
  {
    title: 'Player',
    dataIndex: 'name',
    key: 'name',
    render: (value) => <Typography.Text strong>{value}</Typography.Text>,
  },
  {
    title: 'value',
    key: 'value',
    dataIndex: 'value',
    align: 'right',
  },
];

interface Props {
  title: string;
  getStatsMethod: () => Promise<DataType[]>;
}

const LifetimeStats = ({ getStatsMethod, title }: Props) => {
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    getStatsMethod()
      .then(values => {
        setData(values);
      })
      .catch(error => {
        console.log(error);
      });
  }, [getStatsMethod]);
  return (
    <div>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Table
        showHeader={false}
        pagination={false}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default LifetimeStats;
