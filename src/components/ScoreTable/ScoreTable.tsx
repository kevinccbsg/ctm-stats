import { Avatar, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  image: string | null;
  description: string;
  value: string;
  link: string | null;
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
  {
    title: 'link',
    key: 'link',
    dataIndex: 'link',
    align: 'right',
    render: (value: string) => value ? (
      <a href={value} target='_blank' rel="noopener noreferrer"><VideoCameraOutlined /></a>
    ): (<span>No link</span>),
  },
  Table.EXPAND_COLUMN,
];

interface Props {
  title: string;
  data: Omit<DataType, 'key'>[];
}

const ScoreTable = ({ data, title }: Props) => {
  return (
    <div>
      <Typography.Title style={{ minHeight: 68 }} level={4}>{title}</Typography.Title>
      <Table
        showHeader={false}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
        }}
        columns={columns}
        dataSource={data.map(value => ({
          ...value,
          key: value.id,
        }))}
      />
    </div>
  );
};

export default ScoreTable;
