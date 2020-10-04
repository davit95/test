import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import {Form, Input, Button, Row, Col, Divider, message} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import {signUp, getUser} from '../../actions/AuthAction';
import './auth.scss';


class Register extends React.Component {
    onFinish = async (values) => {
        await this.props.signUp(values);
        await this.props.getUser();
        this.alert(this.props.isLoggedIn);
    }

    alert = (isLoggedIn) => {
        const { alertMessage } = this.props;
        if (isLoggedIn) {
            message.success(alertMessage);
        } else {
            message.error(alertMessage);
        }
    }

    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to={'/dashboard'} />
        }
        return (
            <Row className="register-page" justify={'center'} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                    <Row justify={'center'}>
                        <Col span={8}>
                            <h1 className="auth-title">Register page</h1>
                        </Col>
                    </Row>
                    <Divider />
                    <Row justify={'center'}>
                        <Col span={8} className="login-form">
                            <Form
                                name="register-form"
                                className="login-form"
                                onFinish={this.onFinish}
                            >
                                <Form.Item
                                    name="name"
                                    rules={[
                                        { required: true, message: 'Please input your Username!' },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please input your Email!' },
                                        { type: 'email', message: 'Email must be valid email' }
                                    ]}
                                >
                                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your Password!' }, {min:5, max:15}]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="confirm"
                                    dependencies={['password']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        {
                                            min: 5,
                                            max: 15
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('The two passwords that you entered do not match!');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />}
                                           type="password"
                                           placeholder="Confirm Password" />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="auth-form-submit-button">
                                        Register
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        loading: state.auth.loading,
        errorMessage: state.auth.errorMessage,
        user: state.auth.user,
        alertMessage: state.auth.alertMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (data) => dispatch(signUp(data)),
        getUser: () => dispatch(getUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)