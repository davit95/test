import React from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {Layout} from 'antd';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import HomePage from '../Main';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Dashboard from '../Dashboard';
import Reservations from '../Reservations';
import AddReservation from '../Reservations/AddReservation';
import EditReservation from '../Reservations/EditReservation';
import HeaderComponent from '../Main/HeaderComponent';


const { Content } = Layout;

const Routes = (props) => {
    return (
        <Router>
            <Layout>
                <HeaderComponent />
                <Content className='content'>
                    <Switch>
                        <PublicRoute exact path='/' component={HomePage} />
                        <PublicRoute exact path='/login' component={Login} />
                        <PublicRoute exact path='/register' component={Register} />
                        <PrivateRoute exact path='/dashboard' component={Dashboard} />
                        <PrivateRoute exact path='/reservation-list' component={Reservations} />
                        <PrivateRoute exact path='/add-reservation' component={AddReservation} />
                        <PrivateRoute exact path='/reservation/:id/edit' component={EditReservation} />
                    </Switch>
                </Content>
            </Layout>
        </Router>
    );
}

export default Routes;