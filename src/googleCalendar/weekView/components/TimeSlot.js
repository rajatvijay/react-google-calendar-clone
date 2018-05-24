import React from 'react';
import {Col} from 'antd';
import {col, slot} from '../styles';

function TimeSlot (props) {
  return (
    <Col
      key={props.dateStamp}
      style={{...col, ...slot}}
      span={3}
      onClick={() => props.openAddEventModal (props.dateStamp, props.time)}
    />
  );
}

export default TimeSlot;
