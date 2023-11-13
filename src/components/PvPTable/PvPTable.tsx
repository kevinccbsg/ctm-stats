import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export interface DataType {
  key: React.Key;
  id: string;
  playerAResult: string;
  playerAStyle: string;
  playerATopout: string;
  playerAScore: string;
  description: string;
  playerBScore: string;
  playerBTopout: string;
  playerBStyle: string;
  playerBResult: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Result',
    dataIndex: 'playerAResult',
    key: 'playerAResult',
  },
  {
    title: 'Style',
    dataIndex: 'playerAStyle',
    key: 'playerAStyle',
  },
  {
    title: 'Topout',
    dataIndex: 'playerATopout',
    key: 'playerATopout',
  },
  {
    title: 'Score',
    dataIndex: 'playerAScore',
    key: 'playerAScore',
  },
  {
    title: 'All Games vs Each Other',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Score',
    dataIndex: 'playerBScore',
    key: 'playerBScore',
  },
  {
    title: 'Topout',
    dataIndex: 'playerBTopout',
    key: 'playerBTopout',
  },
  {
    title: 'Style',
    dataIndex: 'playerBStyle',
    key: 'playerBStyle',
  },
  {
    title: 'Result',
    dataIndex: 'playerBResult',
    key: 'playerBResult',
  },
];

interface Props {
  data: Omit<DataType, 'key'>[];
}

const PvPTable = ({ data }: Props) => {
  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data.map(value => ({
        ...value,
        key: value.id,
      }))}
      scroll={{ x: 992, y: 600 }}
    />
  );
};

export default PvPTable;
