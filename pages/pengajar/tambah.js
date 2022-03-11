import { Button, Card, Col, Form, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { getKelas } from '../../api/kelas'
import { getPelajaran } from '../../api/pelajaran'
import { tambahPengajar } from '../../api/pengajar'
import { getUser } from '../../api/user'

export default function Tambah() {
    const [users, setUsers] = useState({})
    const [guru, setGuru] = useState('')
    const [kelas, setKelas] = useState({})
    const [kelasGuru, setKelasGuru] = useState('')
    const [pelajaran, setPelajaran] = useState({})
    const [pelajaranGuru, setPelajaranGuru] = useState('')

    const onFinish = async (evt) => {
        evt.preventDefault()
        const result = await tambahPengajar({ kelas: kelasGuru, pelajaran: pelajaranGuru, guru })
        if (result) {
            alert('Sukses Menambahkan Pengajar')
        } else {
            alert('Gagal Menambahkan Pengajar')
        }
        window.location.href = '/pengajar'
    };

    const fetchKelas = async () => {
        await getKelas()
        let result = localStorage.getItem('kelas')
        result = JSON.parse(result)
        setKelas(result)
    }

    const fetchGuru = async () => {
        await getUser()
        let result = localStorage.getItem('users')
        result = JSON.parse(result)
        setUsers(result)
    }

    const fetchPelajaran = async () => {
        await getPelajaran()
        let result = localStorage.getItem('pelajaran')
        result = JSON.parse(result)
        setPelajaran(result)
    }

    useEffect(() => {
        fetchKelas()
        fetchGuru()
        fetchPelajaran()
    }, [])

    return (
        <Col style={{ marginTop: '20px' }}>
            <Row justify="center" align="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Col xs={20}>
                    <Card title="Tambah Data Pengajar">
                        <Form
                            layout="horizontal"
                            onSubmit={onFinish}
                        >
                            <Form.Item label="Guru">
                                <Select name="guru" onChange={(val) => setGuru(val)} value={guru}>
                                    {Object.keys(users || {})?.map((item, id) => users[item] && users[item].tipe === "guru" && (
                                        <Select.Option key={id} value={users[item].username}>{users[item].nama}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Kelas">
                                <Select name="kelas" onChange={(val) => setKelasGuru(val)} value={kelasGuru}>
                                    {Object.keys(kelas || {})?.map((item, id) => kelas[item] && (
                                        <Select.Option key={id} value={item}>{kelas[item].nama}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Pelajaran">
                                <Select name="pelajaran" onChange={(val) => setPelajaranGuru(val)} value={pelajaranGuru}>
                                    {Object.keys(pelajaran || {})?.map((item, id) => pelajaran[item] && (
                                        <Select.Option key={id} value={item}>{pelajaran[item].nama}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
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
