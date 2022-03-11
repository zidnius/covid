import { Form, Input, Button, Card, Col, Row } from 'antd';
import { loginUser } from '../api/user';

const Login = () => {

    const onFinish = async (evt) => {
        evt.preventDefault()
        await loginUser(evt.target['username'].value, evt.target['password'].value)
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    };

    return (
        <Col style={{ marginTop: '20px' }}>
            <Row justify="center" align="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Col xs={20}>
                    <Card title="Login">
                        <Form
                            onSubmit={onFinish}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Tolong isi username!',
                                    },
                                ]}
                            >
                                <Input name="username" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Tolong isi password!',
                                    },
                                ]}
                            >
                                <Input.Password name="password" />
                            </Form.Item>
                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row >
        </Col >
    );
};

export default Login