import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from'moment';
import {Form, Input, Button, Select, DatePicker, Divider, Col, Row } from 'antd';
import {ADD, UPDATE} from "../../constants/actions";
import {
    updateReservation,
    addReservation,
} from '../../actions/ReservationAction';

class ReservationForm extends Component {

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
            await this.props.addReservation(data, this.redirect);
        }
        if (action === UPDATE) {
            await this.props.updateReservation(data, id, this.redirect);
        }
    }

    redirect = () => {
        this.props.history.push('/reservation-list');
    }

    revert = () => {
        this.formRef.current.resetFields();
    }

    disableDateRange = current => current && current < moment().endOf('second');

    render() {
        const { actionText, reservation, action } = this.props;
        const { RangePicker } = DatePicker;
        if (action === UPDATE) {
            reservation.date = [moment(reservation.start_date), moment(reservation.end_date)];
        }
        return (
            <Row className="add-reservation-page" justify={'center'} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                    <Row justify={'center'}>
                        <Col span={8}>
                            <h1 className="page-title">{`${actionText} Form`}</h1>
                            <h1 className="room-name">
                                {
                                    action === UPDATE ? reservation.roomName : null
                                }
                            </h1>
                        </Col>
                    </Row>
                    <Divider />
                    <Row justify={'center'}>
                        <Col span={8}>
                            <Form
                                ref={this.formRef}
                                name="add-reservation-form"
                                className="add-reservation-form"
                                initialValues={reservation}
                                onFinish={(values, id) => this.onFinish(values, reservation.id)}
                            >
                                {
                                    action === ADD &&
                                    <Form.Item
                                        label="Room"
                                        labelCol={{ span: 24 }}
                                        name="room_id"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'You must select room!',
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
                                <Form.Item
                                    label="Date"
                                    labelCol={{ span: 24 }}
                                    name="date"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Date field is required!',
                                        },
                                    ]}
                                >
                                    <RangePicker
                                        disabledDate={this.disableDateRange}
                                        format={'YYYY-MM-DD hh:mm:ss'}
                                        showTime
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="notes"
                                    label="Notes"
                                    labelCol={{ span: 24 }}
                                >
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        className="form-submit-button"
                                        type="primary"
                                        loading={this.props.loading}
                                    >
                                        { actionText }
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        className="link-button"
                                        onClick={this.revert}
                                    >
                                        Revert
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.reservation.loading,
})

const mapDispatchToProps = dispacth => {
    return {
        updateReservation: (data, id, redirect) => dispacth(updateReservation(data, id, redirect)),
        addReservation: (data, redirect) => dispacth(addReservation(data, redirect)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReservationForm))