import {Row, Col, Button} from 'antd';
import React from 'react';
import {toolbar} from '../styles';

function WeekToolbar (props) {
  return (
    <Row type="flex" gutter={4} justify="end" style={toolbar}>
      <Col>
        <Button onClick={props.goToPreviousWeek} shape="square" icon="left" />
      </Col>
      <Col>
        <Button onClick={props.goToNextWeek} shape="square" icon="right" />
      </Col>
    </Row>
  );
}

export default WeekToolbar;
