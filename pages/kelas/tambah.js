import React from 'react';
import { Form, Input, Button, Col, Row, Card } from 'antd';
import { tambahKelas } from '../../api/kelas';

export default function Tambah() {
  const onFinish = async (evt) => {
    evt.preventDefault()
    const result = await tambahKelas({ nama: evt.target['nama'].value })
    console.log(result);
    if (result) {
      alert('Sukses Menambahkan Kelas')
    } else {
      alert('Gagal Menambahkan Kelas')
    }
    window.location.href = '/kelas'
  };

  return (
    <Col style={{ marginTop: '20px' }}>
      <Row justify="center" align="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Col xs={20}>
          <Card title="Tambah Kelas">
            <Form
              layout="vertical"
              onSubmit={onFinish}
            >
              <Form.Item label="Kelas" required tooltip="Masukkan Nama Kelas">
                <Input placeholder="Kelas" name="nama" required />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Simpan</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Col>
  )
}
