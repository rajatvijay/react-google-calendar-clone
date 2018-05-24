import {Row, Col} from 'antd';
import React from 'react';
import {col, weekDays, weekDayName, weekDates} from '../styles';

function WeekHeader (props) {
  return (
    <Row type="flex">
      <Col span={3} />
      {props.weekDays.map (day => (
        <Col key={day.dateStamp} style={{...col, ...weekDays}} span={3}>
          <p style={weekDayName}>{day.weekDayName}</p>
          <p style={weekDates}>{day.date}</p>
        </Col>
      ))}
    </Row>
  );
}

export default WeekHeader;
