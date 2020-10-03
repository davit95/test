import React from 'react';
import {connect} from 'react-redux';
import {Form, Input, Button, Row, Col, Divider, message} from 'antd';
import {signUp, getUser} from '../../actions/AuthAction'
import {Redirect} from "react-router-dom";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

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

    formRef = React.createRef();

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to={'/dashboard'} />
        }
        return (
            <>
                <Row justify={'center'}>
                    <Col>
                        <h1>Register page</h1>
                    </Col>
                </Row>
                <Divider />
                <Form
                    {...layout}
                    name="basic"
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={
                            [
                                { required: true, message: 'Please input your name!' },
                            ]
                        }
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={
                            [
                                { required: true, message: 'Please input your email!' },
                                { type: 'email' }
                            ]
                        }
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </>
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