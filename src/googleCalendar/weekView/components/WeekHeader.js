import {Row, Col} from 'antd';
import React from 'react';

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

function WeekHeader (props) {
  return (
    <Row type="flex">
      <Col style={{...style.col, ...style.weekDays}} span={3} />
      {props.weekDays.map (day => (
        <Col
          key={day.dateStamp}
          style={{...style.col, ...style.weekDays}}
          span={3}
        >
          <p style={style.weekDayName}>{day.weekDayName}</p>
          <p style={style.weekDayName}>{day.date}</p>
        </Col>
      ))}
    </Row>
  );
}

export default WeekHeader;
