import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Table, Space, Button, Spin, Row, Col, Divider} from 'antd';
import moment from 'moment';
import '../../assets/common.scss';

import {getReservations} from '../../actions/ReservationAction';

const columns = [
    {
        title: 'Id',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Room Name',
        dataIndex: 'room',
        key: 'room',
    },
    {
        title: 'Created By',
        dataIndex: 'user',
        key: 'user',
    },
    {
        title: 'Start Date',
        dataIndex: 'start_date',
        key: 'start_date',
    },
    {
        title: 'End Date',
        dataIndex: 'end_date',
        key: 'end_date',
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'id',
        render: (text, record) => (
            moment(record.created_at).format("YYYY-MM-DD hh:mm:ss")
        ),
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        key: 'id',
        render: (text, record) => (
            moment(record.updated_at).format("YYYY-MM-DD hh:mm:ss")
        ),
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Link to={`/reservation/${record.key}/edit`}>
                    <Button
                        className="link-button"
                        disabled={record.user_id !== JSON.parse(localStorage.getItem('user_id'))}
                        type={'primary'}>
                        Edit
                    </Button>
                </Link>
            </Space>
        ),
    },
]

class ReservationList extends React.Component {
    componentDidMount() {
        this.props.getReservations();
    }

    render() {
        const { reservations, loading } = this.props;
        return (
            <Row className="login-page" justify={'center'} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                    <Row justify={'center'}>
                        <Col>
                            <h1 className="page-title">Reservation List</h1>
                        </Col>
                    </Row>
                    <Divider />
                    <Row justify={'center'}>
                        <Col>
                            { loading ? <Spin /> : <Table dataSource={reservations} columns={columns} /> }
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.room.loading,
        errorMessage: state.reservation.errorMessage,
        reservations: state.reservation.reservations,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getReservations: () => dispatch(getReservations()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationList)