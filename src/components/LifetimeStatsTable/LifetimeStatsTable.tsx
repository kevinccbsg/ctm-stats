import { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AvatarColumn, NumberColumn, TableTitle } from '../TableUtils';

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
    render: (_val, _record, index) => <NumberColumn value={index + 1} />,
  },
  {
    title: 'Player',
    dataIndex: 'name',
    key: 'name',
    render: (value: string, record) => (
      <AvatarColumn
        image={record.image === '' ? null : record.image}
        value={value}
      />
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
    <div>
      {contextHolder}
      <TableTitle title={title} />
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
