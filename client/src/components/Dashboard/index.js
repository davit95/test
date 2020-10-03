import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Row, Col, Divider} from 'antd';

export default function () {
    return (
        <>
            <Row justify={'center'}>
                <Col>
                    <Link to={'/add-reservation'}>
                        <Button type={'primary'}>New Reservation</Button>
                    </Link>
                    <Divider type={'vertical'} />
                    <Link to={'/reservation-list'}>
                        <Button type={'primary'}>Reservation List</Button>
                    </Link>
                </Col>
            </Row>
        </>
    )
}