import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Row, Col, Divider} from 'antd';
import './dashboard.scss';

export default function () {
    return (
        <>
            <Row justify={'center'} className="dashboard-page">
                <Col>
                    <Link to={'/add-reservation'}>
                        <Button className="dashboard-button" type={'primary'}>New Reservation</Button>
                    </Link>
                    <Divider type={'vertical'} />
                    <Link to={'/reservation-list'}>
                        <Button className="dashboard-button" type={'primary'}>Reservation List</Button>
                    </Link>
                </Col>
            </Row>
        </>
    )
}