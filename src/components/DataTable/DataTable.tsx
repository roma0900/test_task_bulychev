import { FC } from 'react'
import { Table } from 'antd';
import { TableRowType } from '../../types/tabletypes';

interface DataTableProps {
  data: TableRowType[];
  loading: boolean;
  className?: string;
}

const DataTable: FC<DataTableProps> = ({ data, loading, className }) => {
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Price', dataIndex: 'price' }
  ];

  return <Table rowKey="id" dataSource={data} columns={columns} className={className} loading={loading} />;
};

export default DataTable;