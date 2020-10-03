import React from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {Layout} from 'antd';

import PrivateRoute from './PrivateRoute';
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
                <Content style={{ padding: '0 50px', marginTop: 64, minHeight: '500px' }}>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
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