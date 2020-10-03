import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from'moment';
import {Form, Input, Button, Select, DatePicker, Divider, Col, Row, message} from 'antd';
import {ADD, UPDATE} from "../../constants/actions";
import {
    updateReservation,
    addReservation,
} from '../../actions/ReservationAction';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 10,
        span: 16,
    },
};

class ReservationForm extends Component {

    state = {
        disabled: true,
        data: []
    }

    formRef = React.createRef();

    onFinish = async (values, id) => {
        const { action } = this.props;
        const start_date = values.date[0].format('YYYY-MM-DD hh:mm:ss');
        const end_date = values.date[1].format('YYYY-MM-DD hh:mm:ss');
        const { notes, room_id } = values;
        const data = {
            start_date,
            end_date,
            notes
        };
        if (action === ADD) {
            data.room_id = room_id;
            data.user_id = JSON.parse(localStorage.getItem('user_id'));
            await this.props.addReservation(data);
        }
        if (action === UPDATE) {
            await this.props.updateReservation(data, id);
        }
        this.redirect('/reservation-list');
    }

    redirect = () => {
        this.props.history.push('/reservation-list');
    }

    revert = () => {
        this.formRef.current.resetFields();
    }

    render() {
        const { actionText, reservation, action, errorMessage } = this.props;
        const { RangePicker } = DatePicker;
        if (action === UPDATE) {
            reservation.date = [moment(reservation.start_date), moment(reservation.end_date)];
        }
        return (
            <>
                <Row justify={'center'}>
                    <Col>
                        <h1>{`${actionText} Form`}</h1>
                    </Col>
                </Row>
                <Divider />
                <Form
                    {...layout}
                    ref={this.formRef}
                    initialValues={reservation}
                    onFinish={(values, id) => this.onFinish(values, reservation.id)}
                >
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: 'Please input armenian name!',
                            },
                        ]}
                    >
                        <RangePicker format={'YYYY-MM-DD hh:mm:ss'} showTime />
                    </Form.Item>
                    <Form.Item
                        label="Notes"
                        name="notes"
                        rules={[
                            {
                                required: true,
                                message: 'Please input armenian name!',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    {
                        action === ADD &&
                        <Form.Item
                            label="Rooms"
                            name="room_id"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input armenian name!',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select room"
                                allowClear
                            >
                                {
                                    this.props.rooms.map(room =>
                                        <Select.Option
                                            key={room.id}
                                            value={room.id}>
                                            {room.name}
                                        </Select.Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                    }
                    <Form.Item {...tailLayout}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            loading={this.props.loading}
                        >
                            { actionText }
                        </Button>
                        <Divider type={'vertical'} />
                        <Button
                            type="primary"
                            onClick={this.revert}
                        >
                            Revert
                        </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.reservation.updateReservationLoading,
    errorMessage: state.reservation.errorMessage
})

const mapDispatchToProps = dispacth => {
    return {
        updateReservation: (data, id) => dispacth(updateReservation(data, id)),
        addReservation: (data) => dispacth(addReservation(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReservationForm))