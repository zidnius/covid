import { Button, Card, Col, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { getKelas } from '../../api/kelas';

export default function Index() {
  const [data, setData] = useState([])
  const [user, setUser] = useState({})
  const columns = [
    {
      title: 'Kelas',
      dataIndex: 'nama',
      key: 'nama',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <a>Delete</a>
        </>
      ),
    },
  ];

  const getData = async () => {
    await getKelas()
    let result = await localStorage.getItem('kelas')
    result = JSON.parse(result)
    setData(result)
  }

  const getDataUser = async () => {
    let result = await localStorage.getItem('user')
    result = JSON.parse(result)
    setUser(result)
  }

  useEffect(() => {
    getData()
    getDataUser()
  }, [])

  let newData = []
  Object.keys(data || {}).forEach(item => newData.push(data[item]))
  return (
    <Col style={{ marginTop: '20px' }}>
      <Row justify="center" align="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Col xs={20}>
          <Card title="List Kelas">
            {(user?.tipe === "admin" || user?.tipe === 'guru') && (
              <a href="/kelas/tambah">
                <Button type="primary" htmlType="submit" style={{ marginBottom: 10 }} >
                  Tambah Kelas
                </Button>
              </a>
            )}
            <Table columns={columns} dataSource={newData} />
          </Card>
        </Col>
      </Row>
    </Col>
  )
}
