import React from 'react';
import {Row, Col} from 'antd';
import TimeSlot from './TimeSlot';
import {col, slot, row, timeCol, timeString} from '../styles';

function TimeSlotGroup (props) {
  return (
    <Row type="flex" key={props.time} style={row}>
      <Col style={timeCol} span={3}>
        <span style={timeString}>
          {props.time <= 12 ? props.time + 'am' : props.time - 12 + 'pm'}
        </span>
      </Col>
      {props.weekDays.map (day => (
        <TimeSlot
          key={day.dateStamp}
          dateStamp={day.dateStamp}
          time={props.time}
          openAddEventModal={props.openAddEventModal}
        />
      ))}
      {props.children}
    </Row>
  );
}

export default TimeSlotGroup;
