import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { LinkColumn, NumberColumn, TableTitle } from '../TableUtils';

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
    render: (_val, _record, index) => <NumberColumn value={index + 1} />,
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
    render: (value: string) => <LinkColumn value={value} />,
  },
];

interface Props {
  title: string;
  data: Omit<DataType, 'key'>[];
}

const UserResultTable = ({ data, title }: Props) => {
  return (
    <div>
      <TableTitle title={title} />
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
