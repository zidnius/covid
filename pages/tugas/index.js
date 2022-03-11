import { Button, Card, Col, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { getKelas } from '../../api/kelas';
import { getPelajaran } from '../../api/pelajaran';
import { getTugas } from '../../api/tugas';

export default function Index() {
  const [data, setData] = useState([])
  const [kelas, setKelas] = useState({})
  const [user, setUser] = useState({})
  const [pelajaran, setPelajaran] = useState({})
  let columns = [
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
      title: 'Tipe',
      dataIndex: 'tipe',
      key: 'tipe',
    },
    {
      title: 'Keterangan',
      key: 'tipe',
      render: (text, record) => record.tipe === "text" ? (
        <>{record.keterangan}</>
      ) : (
        <>
          <a href={record.link} target="_blank">Tugas </a>
        </>
      ),
    }
  ];
  if (user?.tipe === "guru" || user?.tipe === "admin") {
    columns[4] = {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <a>Delete</a>
        </>
      ),
    }
  }

  const fetchKelas = async () => {
    await getKelas()
    let result = localStorage.getItem('kelas')
    result = JSON.parse(result)
    setKelas(result)
  }

  const getDataUser = async () => {
    let result = await localStorage.getItem('user')
    result = JSON.parse(result)
    setUser(result)
  }

  const fetchPelajaran = async () => {
    await getPelajaran()
    let result = localStorage.getItem('pelajaran')
    result = JSON.parse(result)
    setPelajaran(result)
  }

  const getData = async () => {
    await getTugas()
    let result = await localStorage.getItem('tugas')
    result = JSON.parse(result)
    setData(result)
  }

  useEffect(() => {
    getData()
    getDataUser()
    fetchPelajaran()
    fetchKelas()
  }, [])
  let newData = []
  if (user && user.tipe === "pelajar") {
    Object.keys(data[user.kelas] || {}).forEach(item =>
      Object.keys(data[user.kelas][item] || {}).forEach(item1 => {
        data[user.kelas][item][item1] && newData.push({ ...data[user.kelas][item][item1], pelajaran: pelajaran[item]?.nama, kelas: kelas[user.kelas]?.nama })
      })
    );
  } else if (user && user.tipe === "guru") {

  }
  return (
    <Col style={{ marginTop: '20px' }}>
      <Row justify="center" align="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Col xs={20}>
          <Card title="List Tugas">
            {(user?.tipe === "admin" || user?.tipe === 'guru') && (
              <a href="/tugas/tambah">
                <Button type="primary" htmlType="submit" style={{ marginBottom: 10 }} >
                  Tambah Tugas
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
