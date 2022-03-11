import { Button, Card, Col, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { getPengajar } from '../../api/pengajar';
import { getUser } from '../../api/user';

export default function Index() {
  const [data, setData] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})

  const columns = [
    {
      title: 'Nama',
      key: 'nama',
      render: (text, record) => {
        let nama = ''
        console.log(users);
        { Object.keys(users).forEach(item => users[item].username === record.guru && (nama = users[item].nama)) }
        console.log(nama);
        return (
          <>
            {nama}
          </>
        )
      },
    },
    {
      title: 'Kelas',
      dataIndex: 'kelas',
      key: 'kelas',
    },
    {
      title: 'Pelajaran',
      dataIndex: 'pelajaran',
      key: 'pelajaran',
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
    await getPengajar()
    let result = await localStorage.getItem('pengajar')
    result = JSON.parse(result)
    setData(result)
  }

  const fetchUser = async () => {
    await getUser()
    let result = await localStorage.getItem('users')
    result = JSON.parse(result)
    setUsers(result)
  }

  const getDataUser = async () => {
    let result = await localStorage.getItem('user')
    result = JSON.parse(result)
    setUser(result)
  }

  useEffect(() => {
    getData()
    fetchUser()
    getDataUser()
  }, [])

  let newData = []
  Object.keys(data || {}).forEach(item => newData.push(data[item]))
  return (
    <Col style={{ marginTop: '20px' }}>
      <Row justify="center" align="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Col xs={20}>
          <Card title="List Pengajar">
          {(user?.tipe === "admin" || user?.tipe === 'guru') && (
              <a href="/pengajar/tambah">
                <Button type="primary" htmlType="submit" style={{ marginBottom: 10 }} >
                  Tambah Pengajar
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
