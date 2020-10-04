import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {Form, Input, Button, Row, Col, Divider, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {signIn, getUser} from '../../actions/AuthAction';
import './auth.scss';
import '../../assets/common.scss';


class Login extends React.Component {

    onFinish = async (values) => {
        await this.props.signIn(values);
        await this.props.getUser();
    }

    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to={'/dashboard'} />
        }
        return (
            <Row className="login-page" justify={'center'} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                    <Row justify={'center'}>
                        <Col span={8}>
                            <h1 className="page-title">Login page</h1>
                        </Col>
                    </Row>
                    <Divider />
                    <Row justify={'center'}>
                        <Col span={8}>
                            <Form
                                name="login-form"
                                className="login-form"
                                onFinish={this.onFinish}
                            >
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please input your Email!' },
                                        { type: 'email' }
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Please input your Password!' },
                                        {
                                            min: 5,
                                            max: 15
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="form-submit-button">
                                        Log in
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
        hasError: state.auth.hasError,
        user: state.auth.user,
        alert: state.auth.alert,
        alertMessage: state.auth.alertMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (data) => dispatch(signIn(data)),
        getUser: () => dispatch(getUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))