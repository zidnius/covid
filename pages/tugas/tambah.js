import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { getKelas } from '../../api/kelas'
import { tambahTugas } from '../../api/tugas'
import { getPelajaran } from '../../api/pelajaran'
import { uploadMedia } from '../../api/upload'

export default function Tambah() {

  const [kelas, setKelas] = useState({})
  const [tipe, setTipe] = useState('text')
  const [kelasTugas, setKelasTugas] = useState('')
  const [pelajaran, setPelajaran] = useState({})
  const [pelajaranTugas, setPelajaranTugas] = useState('')
  const upload = useRef(null)

  const fetchKelas = async () => {
    await getKelas()
    let result = localStorage.getItem('kelas')
    result = JSON.parse(result)
    setKelas(result)
  }

  const onFinish = async (evt) => {
    evt.preventDefault()
    if (tipe === "text") {
      onTambahTugas({}, evt)
    } else {
      await uploadMedia(upload.current.files[0], (data) => onTambahTugas(data, evt))
    }
  };

  const onTambahTugas = async (data, evt) => {
    const result = await tambahTugas(kelasTugas, pelajaranTugas, { tipe, ...data, keterangan: evt.target ? evt.target['keterangan']?.value : null })
    if (result) {
      alert('Sukses Menambahkan Tugas')
    } else {
      alert('Gagal Menambahkan Tugas')
    }
    setTimeout(() => {
      window.location.href = "/tugas"
    }, 1000)
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
          <Card title="Tambah Tugas">
            <Form
              layout="horizontal"
              onSubmit={onFinish}
            >
              <Form.Item label="Kelas">
                <Select name="kelas" onChange={(val) => setKelasTugas(val)} value={kelasTugas}>
                  {Object.keys(kelas || {})?.map((item, id) => kelas[item] && (
                    <Select.Option key={id} value={item}>{kelas[item].nama}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Pelajaran">
                <Select name="pelajaran" onChange={(val) => setPelajaranTugas(val)} value={pelajaranTugas}>
                  {Object.keys(pelajaran || {})?.map((item, id) => pelajaran[item] && (
                    <Select.Option key={id} value={item}>{pelajaran[item].nama}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Tipe">
                <Select name="tipe" value={tipe} onChange={(val) => { setTipe(val) }}>
                  <Select.Option value="text">Text</Select.Option>
                  <Select.Option value="upload">Upload</Select.Option>
                </Select>
              </Form.Item>
              {tipe === "text" ? (
                <Form.Item label="Keterangan" required tooltip="Keterangan">
                  <Input placeholder="Keterangan" name="keterangan" required />
                </Form.Item>
              ) : (
                <Form.Item>
                  <input type="file" hidden ref={upload} required />
                  <Button onClick={() => upload.current.click()}>Click untuk upload tugas</Button>
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
