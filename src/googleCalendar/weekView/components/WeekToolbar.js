import {Row, Col, Button, Icon} from 'antd';
import React from 'react';
import {toolbar, toolbarDate, appTitle, alignRight, spacify} from '../styles';
import moment from 'moment';

function WeekToolbar (props) {
  const formattedDate = moment (props.startDate).format ('MMM YYYY');
  return (
    <Row type="flex" gutter={4} style={toolbar}>
      <Col span={6} offset={3} style={appTitle}>
        <Icon type="calendar" style={spacify} />Meeting Calendar
      </Col>
      <Col span={3} offset={8} style={alignRight}>
        <Button onClick={props.goToToday}>Today</Button>
      </Col>

      <Col span={2} style={alignRight}>
        <Button onClick={props.goToPreviousWeek} style={spacify} icon="left" />
        <Button onClick={props.goToNextWeek} icon="right" />
      </Col>

      <Col span={2} style={toolbarDate}>
        {formattedDate}
      </Col>

    </Row>
  );
}

export default WeekToolbar;
