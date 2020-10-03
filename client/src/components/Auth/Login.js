import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {Form, Input, Button, Row, Col, Divider, message} from 'antd';
import {signIn, getUser} from '../../actions/AuthAction';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class Login extends React.Component {

    onFinish = async (values) => {
        await this.props.signIn(values);
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
                        <h1>Login page</h1>
                    </Col>
                </Row>
                <Divider />
                <Form
                    {...layout}
                    name="basic"
                    ref={this.formRef}
                    onFinish={this.onFinish}
                >
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
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Password must contain min 6 characters' },
                            { max: 15, message: 'Password must contain max 15 characters' },
                        ]}
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