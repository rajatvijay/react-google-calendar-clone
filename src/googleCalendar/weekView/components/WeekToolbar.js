import {Row, Col} from 'antd';
import React from 'react';

function WeekToolbar (props) {
  return (
    <Row type="flex" gutter={4}>
      <Col><a onClick={props.goToPreviousWeek}>Previous</a></Col>
      <Col><a onClick={props.goToNextWeek}>Next</a></Col>
    </Row>
  );
}

export default WeekToolbar;
