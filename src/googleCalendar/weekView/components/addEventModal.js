import {Modal, Button, Input, DatePicker} from 'antd';
import React from 'react';
import moment from 'moment';

const {RangePicker} = DatePicker;
function AddEventModal (props) {
  return (
    <Modal
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={props.onOk}>
          Add Event
        </Button>,
      ]}
    >
      <Input
        type="text"
        placeholder="Add Title"
        value={props.eventTitle}
        style={{border: 'none', marginTop: 10}}
        size="large"
        autoFocus={true}
        onChange={e => props.onTitleChange (e.target.value)}
      />
      <RangePicker
        value={[moment (props.initialStartTime), moment (props.initialEndTime)]}
        onChange={props.onTimeChange}
        showTime={{
          format: 'HH:mm',
          hourStep: 1,
          minuteStep: 30,
          defaultValue: [
            moment (props.initialStartTime),
            moment (props.initialEndTime),
          ],
        }}
        format="MMM Do, YYYY hh:mm a"
      />
    </Modal>
  );
}

export default AddEventModal;
