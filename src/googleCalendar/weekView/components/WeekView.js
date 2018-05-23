import React, {Component} from 'react';
import {Row, Col} from 'antd';
import moment from 'moment';

const times = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
];

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
  },
  time: {
    fontSize: 10,
    color: '#212121',
  },
};

function getAllDaysInTheWeek (currentDate = moment ()) {
  const weekStart = currentDate.clone ().startOf ('week');

  const days = Array.from (Array (7))
    .map ((day, index) => index + 1)
    .map (day => moment (weekStart).add (day, 'days'))
    .map (momentObj => ({
      date: momentObj.date (),
      timeStamp: +momentObj,
      weekDayName: momentObj.format ('ddd'),
    }));

  return days;
}

class WeekView extends Component {
  state = {
    startDate: +moment (),
    weekDays: getAllDaysInTheWeek (),
  };

  goToNextWeek = () => {
    const dateAfter7Days = moment (this.state.startDate).add (7, 'days');
    this.setState ({
      startDate: +dateAfter7Days,
      weekDays: getAllDaysInTheWeek (dateAfter7Days),
    });
  };

  goToPreviousWeek = () => {
    const dateBefore7Days = moment (this.state.startDate).subtract (7, 'days');
    this.setState ({
      startDate: +dateBefore7Days,
      weekDays: getAllDaysInTheWeek (dateBefore7Days),
    });
  };

  render () {
    const {weekDays} = this.state;
    return (
      <div>
        {/* Toolbar */}
        <Row type="flex" gutter={4}>
          <Col><a onClick={this.goToPreviousWeek}>Previous</a></Col>
          <Col><a onClick={this.goToNextWeek}>Next</a></Col>
        </Row>

        {/* WeekDays */}
        <Row type="flex">
          <Col style={{...style.col, ...style.weekDays}} span={3} />
          <React.Fragment>
            {weekDays.map (day => (
              <Col style={{...style.col, ...style.weekDays}} span={3}>
                <p style={style.weekDayName}>{day.weekDayName}</p>
                <p style={style.weekDayName}>{day.date}</p>
              </Col>
            ))}
          </React.Fragment>
        </Row>

        {/* Slots */}
        <React.Fragment>
          {times.map (time => (
            <Row type="flex">
              <Col style={{...style.col, ...style.slot}} span={3}>
                <span style={style.time}>{time}</span>
              </Col>
              <React.Fragment>
                {weekDays.map (day => (
                  <Col style={{...style.col, ...style.slot}} span={3} />
                ))}
              </React.Fragment>
            </Row>
          ))}
        </React.Fragment>
      </div>
    );
  }
}

export default WeekView;
