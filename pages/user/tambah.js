import { Button, Card, Col, Form, Input, Radio, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { getKelas } from '../../api/kelas';
import { getTipeUser, tambahUser } from '../../api/user';

export default function Tambah() {
  const [tipe, setTipe] = useState({})
  const [tipeUser, setTipeUser] = useState('admin')
  const [kelas, setKelas] = useState({})
  const [kelasMurid, setKelasMurid] = useState('')

  const onFinish = async (evt) => {
    evt.preventDefault()
    const result = await tambahUser({ nama: evt.target['nama'].value, username: evt.target['username'].value, password: evt.target['password'].value, tipe: tipeUser, kelas: kelasMurid })
    console.log(result);
    if (result) {
      alert('Sukses Menambahkan User')
    } else {
      alert('Gagal Menambahkan User')
    }
    window.location.href = '/user'
  };

  const fetchTipeUser = async () => {
    await getTipeUser()
    let result = localStorage.getItem('tipe')
    result = JSON.parse(result)
    setTipe(result)
  }

  const fetchKelas = async () => {
    await getKelas()
    let result = localStorage.getItem('kelas')
    result = JSON.parse(result)
    setKelas(result)
  }

  useEffect(() => {
    fetchTipeUser()
    fetchKelas()
  }, [])

  return (
    <Col style={{ marginTop: '20px' }}>
      <Row justify="center" align="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Col xs={20}>
          <Card title="Tambah user">
            <Form
              layout="horizontal"
              onSubmit={onFinish}
            >
              <Form.Item label="Nama">
                <Input name="nama" required />
              </Form.Item>
              <Form.Item label="Username">
                <Input name="username" required />
              </Form.Item>
              <Form.Item label="Password">
                <Input name="password" required />
              </Form.Item>
              <Form.Item label="Sebagai">
                <Radio.Group value={tipeUser} required onChange={(val) => { setTipeUser(val.target.value); setKelasMurid() }}>
                  {Object.keys(tipe || {})?.map((item, id) => tipe[item] && (
                    <Radio.Button key={id} value={tipe[item].id}>{tipe[item].nama}</Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
              {tipeUser === "pelajar" &&
                (
                  <Form.Item label="Kelas">
                    <Select name="kelas" onChange={(val) => setKelasMurid(val)} value={kelasMurid}>
                      {Object.keys(kelas || {})?.map((item, id) => kelas[item] && (
                        <Select.Option key={id} value={item}>{kelas[item].nama}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Simpan
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Col>
  )
}
