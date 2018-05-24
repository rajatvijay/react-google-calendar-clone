import {Row, Col} from 'antd';
import React from 'react';
import {
  col,
  weekDays,
  weekDayName,
  weekDates,
  lightHighlighter,
} from '../styles';
import {isTodaysDate} from '../../utils';

function WeekHeader (props) {
  return (
    <Row type="flex">
      <Col span={3} />
      {props.weekDays.map (day => (
        <Col
          key={day.dateStamp}
          span={3}
          style={
            isTodaysDate (day.dateStamp)
              ? {...col, ...weekDays, ...lightHighlighter}
              : {...col, ...weekDays}
          }
        >
          <p style={weekDayName}>{day.weekDayName}</p>
          <p style={weekDates}>{day.date}</p>
        </Col>
      ))}
    </Row>
  );
}

export default WeekHeader;
