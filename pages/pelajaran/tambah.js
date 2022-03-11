import React from 'react';
import { Form, Input, Button, Col, Row, Card } from 'antd';
import { tambahPelajaran } from '../../api/pelajaran';

export default function Tambah() {

    const onFinish = async (evt) => {
        evt.preventDefault()
        const result = await tambahPelajaran({ nama: evt.target['nama'].value })
        console.log(result);
        if (result) {
            alert('Sukses Menambahkan Pelajaran')
        } else {
            alert('Gagal Menambahkan Pelajaran')
        }
        window.location.href = '/pelajaran'
    };

    return (
        <Col style={{ marginTop: '20px' }}>
            <Row justify="center" align="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Col xs={20}>
                    <Card title="Tambah Pelajaran">
                        <Form
                            layout="vertical"
                            onSubmit={(evt) => onFinish(evt)}
                        >
                            <Form.Item label="Nama Pelajaran">
                                <Input placeholder="Nama Pelajaran" name="nama" required />
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
