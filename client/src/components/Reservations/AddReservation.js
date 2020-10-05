import React, {useEffect} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Col, Row, Spin, message} from 'antd';
import ReservationForm from './ReservationForm';
import {RESERVATION_FORM_ACTION_ADD} from '../../constants/reservation';
import {ADD} from '../../constants/actions';
import {getRooms} from "../../actions/RoomAction";

// export default function () {
//     const dispatch = useDispatch();
//     const { loading, rooms } = useSelector(state => state.room);
//     useEffect(() => {
//         dispatch(getRooms(alert));
//     }, []);
//
//     return (
//         <>
//             {
//                 loading ? (
//                     <Row justify={'center'}>
//                         <Col>
//                             <Spin />
//                         </Col>
//                     </Row>
//                 ) : <ReservationForm
//                     action={ADD}
//                     actionText={RESERVATION_FORM_ACTION_ADD}
//                     reservation={{}}
//                     rooms={rooms}
//                 />
//
//             }
//         </>
//     )
// }

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
    loading: state.room.loading,
    rooms: state.room.rooms,
    message: state.room.message
})

const mapDispatchToProps = dispatch => {
    return {
        getRooms: () => dispatch(getRooms()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReservation)