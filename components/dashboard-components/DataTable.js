import { Table } from 'antd'
import { CardStyled } from './style'
import styled from 'styled-components'

const StyledTable = styled(Table)`
  .ant-table table {
    border-left: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
  }
`

export default ({ data }) => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'id'
    },
    {
      title: 'Nama Faskes',
      dataIndex: 'nama',
      sorter: (a, b) => a.totalLikes - b.totalLikes,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Alamat',
      dataIndex: 'alamat',
      sorter: (a, b) => a.alamat - b.alamat,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Total 1',
      dataIndex: 'total1',
      sorter: (a, b) => a.total1 - b.total1,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Total 2',
      dataIndex: 'total2',
      sorter: (a, b) => a.total2 - b.total2,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Total',
      dataIndex: 'total',
      sorter: (a, b) => a.total - b.total,
      sortDirections: ['descend', 'ascend']
    },
  ]

  return (
    <CardStyled style={{ background: '#f4f4f4', padding: 0 }} bodyStyle={{ padding: 0 }}>
      <StyledTable
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        className="sculpture-table"
      />
    </CardStyled>
  )
}
