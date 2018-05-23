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
        value={props.currentEvent.title}
        style={{border: 'none', marginTop: 10}}
        size="large"
        autoFocus={true}
        onChange={e => props.onTitleChange (e.target.value)}
      />
      <RangePicker
        showTime={{format: 'HH:mm'}}
        value={[
          moment (props.currentEvent.startTimeStamp),
          moment (props.currentEvent.endTimeStamp),
        ]}
        onChange={props.onTimeChange}
        showTime={{
          defaultValue: [
            moment (props.currentEvent.startTimeStamp),
            moment (props.currentEvent.endTimeStamp),
          ],
        }}
        format="MMM, YYYY Do  hh a"
      />
    </Modal>
  );
}

export default AddEventModal;
