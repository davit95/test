import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Menu, Layout} from 'antd';
import {signOut} from "../../actions/AuthAction";

class HeaderComponent extends React.Component {

    handleLogout = () => {
        this.props.signOut();
        this.redirect();
    }

    redirect = () => {
        this.props.history.push('/login');
    }
    render() {
        const { Header } = Layout;
        const token = localStorage.getItem('token');
        return (
            <Header className='header'>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    {
                        token &&
                            <Menu.Item key="1">
                                <Link to={'/dashboard'}>Dashboard</Link>
                            </Menu.Item>
                    }

                        {
                            token ? (
                                <Menu.Item
                                    onClick={this.handleLogout}
                                    key="2"
                                    style={{ float: 'right' }}
                                >
                                    Logout
                                </Menu.Item>
                            ) : (
                                <>
                                    <Menu.Item key="3" style={{ float: 'right' }}>
                                        <Link to={'/login'}>Login</Link>
                                    </Menu.Item>
                                    <Menu.Item key="4" style={{ float: 'right' }}>
                                        <Link to={'/register'}>Register</Link>
                                    </Menu.Item>
                                </>
                            )
                        }

                </Menu>
            </Header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderComponent))