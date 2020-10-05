import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Col, message, Row, Spin} from 'antd';
import ReservationForm from './ReservationForm';
import {RESERVATION_FORM_ACTION_ADD} from '../../constants/reservation';
import {ADD} from '../../constants/actions';
import {getRooms} from "../../actions/RoomAction";

class AddReservation extends React.Component {
    componentDidMount() {
        this.props.getRooms();
    }

    alert = (errorMessage) => {
        message.error(errorMessage);
        this.props.history.push('/reservation-list');
    }

    render() {
        const { rooms, loading, errorMessage } = this.props;
        if (errorMessage) {
            return <Redirect to={'/reservation-list'} />
        }
        return (
            <>
                {
                    loading ? (
                        <Row justify={'center'}>
                            <Col>
                                <Spin />
                            </Col>
                        </Row>
                    ) : <ReservationForm
                            action={ADD}
                            actionText={RESERVATION_FORM_ACTION_ADD}
                            reservation={{}}
                            rooms={rooms}
                        />

                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.reservation.loading,
    rooms: state.room.rooms,
    errorMessage: state.room.errorMessage
})

const mapDispatchToProps = dispatch => {
    return {
        getRooms: () => dispatch(getRooms()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReservation)