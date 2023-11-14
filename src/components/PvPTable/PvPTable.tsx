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
    title: 'Player 1',
    children: [
      {
        title: 'Result',
        dataIndex: 'playerAResult',
        key: 'playerAResult',
        width: 85
      },
      {
        title: 'Style',
        dataIndex: 'playerAStyle',
        key: 'playerAStyle',
        width: 85
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
    ],
  },
  {
    title: 'All Games vs Each Other',
    dataIndex: 'description',
    key: 'description',
    width: 270
  },
  {
    title: 'Player 2',
    children: [
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
        width: 85
      },
      {
        title: 'Result',
        dataIndex: 'playerBResult',
        key: 'playerBResult',
        width: 85
      },  
    ],
  },
];

interface Props {
  playerA: string;
  playerB: string;
  data: Omit<DataType, 'key'>[];
}

const PvPTable = ({ data, playerA, playerB }: Props) => {
  const formatColumns = columns.map((column, index) => {
    if (index === 0) return { ...column, title: playerA };
    else if (index === 2) return { ...column, title: playerB };
    return { ...column };
  })
  return (
    <Table
      pagination={false}
      columns={formatColumns}
      dataSource={data.map(value => ({
        ...value,
        key: value.id,
      }))}
      scroll={{ x: 992, y: 600 }}
    />
  );
};

export default PvPTable;
