import { Button, Card, Col, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/user';

export default function Index() {
  const [data, setData] = useState([])
  const [user, setUser] = useState({})
  const columns = [
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Tipe',
      dataIndex: 'tipe',
      key: 'tipe',
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
    await getUser()
    let result = await localStorage.getItem('users')
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
          <Card title="List user">
            {(user?.tipe === "admin" || user?.tipe === 'guru') && (
              <a href="/user/tambah">
                <Button type="primary" htmlType="submit" style={{ marginBottom: 10 }} >
                  Tambah User
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
