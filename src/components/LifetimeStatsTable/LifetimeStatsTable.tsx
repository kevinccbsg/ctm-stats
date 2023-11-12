import { useEffect, useState } from 'react';
import { Avatar, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  id: number;
  image: string | null;
  name: string;
  value: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    width: 50,
    render: (_val, _record, index) => <Typography.Text strong style={{ color: '#20e128'}}>{index + 1}</Typography.Text>,
  },
  {
    title: 'Player',
    dataIndex: 'name',
    key: 'name',
    render: (value, record) => (
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Avatar
          size={40}
          src={record.image === '' ? null : record.image}
          icon={<UserOutlined />}
        />
        <Typography.Text strong>{value}</Typography.Text>
      </div>
    ),
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
  getStatsMethod: () => Promise<Omit<DataType, 'key'>[]>;
}

const LifetimeStats = ({ getStatsMethod, title }: Props) => {
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
    <div>
      <Typography.Title level={4} style={{ minHeight: 68 }}>{title}</Typography.Title>
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
