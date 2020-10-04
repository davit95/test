import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spin, message, Row, Col} from 'antd';
import ReservationForm from './ReservationForm';
import {RESERVATION_FORM_ACTION_EDIT} from '../../constants/reservation';
import {getReservation} from '../../actions/ReservationAction';
import {UPDATE} from '../../constants/actions';


class EditReservation extends React.Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getReservation(id, this.redirect);
    }

    redirect = (errorMessage) => {
        this.props.history.push('/reservation-list');
    }

    render() {
        const { loading, reservation } = this.props;
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
                        roomName={'reservation'}
                        reservation={reservation}
                        actionText={RESERVATION_FORM_ACTION_EDIT}
                        action={UPDATE}
                    />

                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.reservation.loading,
    reservation: state.reservation.reservation,
    errorMessage: state.reservation.errorMessage,
})

const mapDispatchToProps = dispacth => {
    return {
        getReservation: (id, redirect) => dispacth(getReservation(id, redirect)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditReservation));