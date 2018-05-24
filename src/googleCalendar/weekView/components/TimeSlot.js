import React from 'react';
import {Col} from 'antd';

// TODO: Remove the duplication
const style = {
  col: {
    border: '#e0e0e0 1px solid',
  },
  weekDays: {
    height: 100,
  },
  weekDayName: {
    fontSize: 12,
    lineHeight: '32px',
    textTransform: 'capitalize',
    color: '#757575',
    marginLeft: 10,
  },
  slot: {
    height: 40,
    cursor: 'pointer',
  },
  time: {
    fontSize: 10,
    color: '#212121',
  },
};
function TimeSlot (props) {
  return (
    <Col
      key={props.dateStamp}
      style={{...style.col, ...style.slot}}
      span={3}
      onClick={() => props.openAddEventModal (props.dateStamp, props.time)}
    />
  );
}

export default TimeSlot;
