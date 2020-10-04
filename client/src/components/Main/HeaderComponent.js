import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Menu, Layout} from 'antd';
import {signOut} from "../../actions/AuthAction";
import './header.scss';

class HeaderComponent extends React.Component {

    handleLogout = () => {
        this.props.signOut(this.redirect);
    }

    redirect = () => {
        this.props.history.push('/login');
    }
    render() {
        const { Header } = Layout;
        const token = localStorage.getItem('token');
        return (
            <Header className='header'>
                <Menu theme="dark" mode="horizontal">
                    {
                        token &&
                            <Menu.Item key="1" className="dashboard-link left">
                                <Link to={'/dashboard'}>Dashboard</Link>
                            </Menu.Item>
                    }

                        {
                            token ? (
                                <Menu.Item
                                    className="right"
                                    onClick={this.handleLogout}
                                    key="2"
                                >
                                    Logout
                                </Menu.Item>
                            ) : (
                                <>
                                    <Menu.Item className="right" key="3">
                                        <Link to={'/login'}>Login</Link>
                                    </Menu.Item>
                                    <Menu.Item className="right" key="4">
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
        isLoggedIn: state.auth.isLoggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (data) => dispatch(signOut(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderComponent))