import React from 'react';
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
  data: DataType[];
  title: string;
}

const StatTable: React.FC<Props> = ({ data, title }) => (
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

export default StatTable;
