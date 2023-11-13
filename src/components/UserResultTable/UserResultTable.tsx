import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { VideoCameraOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  id: number;
  score: string;
  description: string;
  link: string | null;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    width: 75,
    render: (_val, _record, index) => <Typography.Text strong style={{ color: '#20e128'}}>{index + 1}</Typography.Text>,
  },
  {
    title: 'Player',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: 'description',
    key: 'description',
    dataIndex: 'description',
  },
  {
    title: 'link',
    key: 'link',
    dataIndex: 'link',
    align: 'right',
    render: (value: string) => value ? (
      <a href={value} target='_blank' rel="noopener noreferrer"><VideoCameraOutlined /></a>
    ): (<span>No link</span>),
  },
];

interface Props {
  title: string;
  data: Omit<DataType, 'key'>[];
}

const UserResultTable = ({ data, title }: Props) => {
  return (
    <div>
      <Typography.Title style={{ minHeight: 68 }} level={4}>{title}</Typography.Title>
      <Table
        showHeader={false}
        pagination={false}
        columns={columns}
        dataSource={data.map(value => ({
          ...value,
          key: value.id,
        }))}
      />
    </div>
  );
};

export default UserResultTable;
