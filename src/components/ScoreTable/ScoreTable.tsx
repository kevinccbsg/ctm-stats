import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './ScoreTable.module.scss';
import { LinkColumn, NumberColumn, AvatarColumn, TableTitle } from '../TableUtils';

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
  {
    title: 'link',
    key: 'link',
    dataIndex: 'link',
    align: 'right',
    responsive: ['md'],
    render: (value: string) => <LinkColumn value={value} />,
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
      <TableTitle title={title} />
      <Table
        showHeader={false}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <p className={styles.expandable}>
              {record.description}.
              <span className={styles.link}><LinkColumn value={record.link} /></span>
            </p>
          ),
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
