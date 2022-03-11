import { Card, Col, Row } from 'antd'
import React from 'react'

export default function index() {
  return (
    <Col style={{ marginTop: '20px' }}>
      <Row justify="center" align="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Col xs={24}>
          <Card>
            <h1>Welcome!</h1>
          </Card>
        </Col>
      </Row>
    </Col>
  )
}
