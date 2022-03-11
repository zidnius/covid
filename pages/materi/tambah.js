import { Button, Card, Col, Form, Row, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { getKelas } from '../../api/kelas'
import { tambahMateri } from '../../api/materi'
import { getPelajaran } from '../../api/pelajaran'
import { uploadMedia } from '../../api/upload'

export default function Tambah() {
    const [kelas, setKelas] = useState({})
    const [kelasMateri, setKelasMateri] = useState('')
    const [pelajaran, setPelajaran] = useState({})
    const [pelajaranMateri, setPelajaranMateri] = useState('')
    const upload = useRef(null)

    const fetchKelas = async () => {
        await getKelas()
        let result = localStorage.getItem('kelas')
        result = JSON.parse(result)
        setKelas(result)
    }

    const onFinish = async (evt) => {
        evt.preventDefault()
        await uploadMedia(upload.current.files[0], onTambahMateri)
    };

    const onTambahMateri = async (data) => {
        const result = await tambahMateri(kelasMateri, pelajaranMateri, { tipe: "upload", ...data })
        if (result) {
            alert('Sukses Menambahkan Materi')
        } else {
            alert('Gagal Menambahkan Materi')
        }
        setTimeout(()=>{
            window.location.href = "/materi"
        },1000)
    }

    const fetchPelajaran = async () => {
        await getPelajaran()
        let result = localStorage.getItem('pelajaran')
        result = JSON.parse(result)
        setPelajaran(result)
    }

    useEffect(() => {
        fetchKelas()
        fetchPelajaran()
    }, [])

    return (
        <Col style={{ marginTop: '20px' }}>
            <Row justify="center" align="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Col xs={20}>
                    <Card title="Tambah Materi">
                        <Form
                            layout="horizontal"
                            onSubmit={onFinish}
                        >
                            <Form.Item label="Kelas">
                                <Select name="kelas" onChange={(val) => setKelasMateri(val)} value={kelasMateri}>
                                    {Object.keys(kelas || {})?.map((item, id) => kelas[item] && (
                                        <Select.Option key={id} value={item}>{kelas[item].nama}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Pelajaran">
                                <Select name="pelajaran" onChange={(val) => setPelajaranMateri(val)} value={pelajaranMateri}>
                                    {Object.keys(pelajaran || {})?.map((item, id) => pelajaran[item] && (
                                        <Select.Option key={id} value={item}>{pelajaran[item].nama}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <input type="file" hidden ref={upload} required />
                                <Button onClick={() => upload.current.click()}>Click untuk upload materi</Button>
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
