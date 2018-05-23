import React, {Component} from 'react';
import {Row, Col} from 'antd';
import moment from 'moment';
import AddEventModal from './addEventModal';

// TODO: Fix this!
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
].map (time => Number (time));

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

const EventDisplayer = props => (
  <div
    style={{
      position: 'absolute',
      top: props.top,
      left: 0,
      height: props.highlightHeight,
      right: 0,
      background: 'green',
    }}
  />
);

class WeekView extends Component {
  state = {
    startDate: +moment (),
    weekDays: getAllDaysInTheWeek (),
    showAddEventModal: false,
    currentEvent: {
      title: '',
      startTimeStamp: null,
      endTimeStamp: null,
    },
    // Might store it in a better DS such that searching is less costly!
    allEvents: {},
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

  openAddEventModal = (dateStamp, time) => {
    const startTimeStamp = moment (dateStamp)
      .set ('hour', time)
      .set ('minutes', 0)
      .set ('seconds', 0);
    const endTimeStamp = startTimeStamp.clone ().add (1, 'hour');

    this.setState (previousState => {
      return {
        showAddEventModal: true,
        currentEvent: {
          ...previousState.currentEvent,
          startTimeStamp: +startTimeStamp,
          endTimeStamp: +endTimeStamp,
        },
      };
    });
  };

  onCloseAddEventModal = () => {
    this.setState ({
      showAddEventModal: false,
    });
  };

  getHeightValueForEventDisplayer = ({startTimeStamp, endTimeStamp}) => {
    const duration = moment
      .duration (moment (endTimeStamp).diff (moment (startTimeStamp)))
      .as ('hours');
    console.log ('height', duration * 100);
    return duration * 100 + '%';
  };

  getTopValueForEventDiplayer = ({startTimeStamp}) => {
    const startMinutes = moment (startTimeStamp).minutes ();
    return startMinutes === 30 ? '50%' : '0';
  };

  onOkAddEventModal = () => {
    this.setState (previousState => {
      const startTimeStamp = previousState.currentEvent.startTimeStamp;

      let allEvents;
      if (previousState.allEvents[[startTimeStamp.toString ()]]) {
        allEvents = {
          ...previousState.allEvents,
          [startTimeStamp.toString ()]: [
            ...previousState.allEvents[startTimeStamp.toString ()],
            {
              ...previousState.currentEvent,
            },
          ],
        };
      } else {
        allEvents = {
          ...previousState.allEvents,
          [startTimeStamp.toString ()]: [previousState.currentEvent],
        };
      }

      return {
        allEvents,
        showAddEventModal: false,
        currentEvent: {
          title: '',
          startTimeStamp: null,
          endTimeStamp: null,
        },
      };
    });
  };

  onTitleChange = title => {
    this.setState (previousState => ({
      currentEvent: {
        ...previousState.currentEvent,
        title,
      },
    }));
  };

  onCurrentEventTimeChange = dates => {
    this.setState (previousState => ({
      currentEvent: {
        ...previousState.currentEvent,
        startTimeStamp: +dates[0],
        endTimeStamp: +dates[1],
      },
    }));
  };

  getEventsForThisTime = (dateStamp, time, allEvents) => {
    console.log (allEvents, new Date (dateStamp));
    const startTimeStamp = moment (dateStamp)
      .set ('hour', time)
      .set ('minutes', 0)
      .set ('seconds', 0);
    const startTimeStampPlus30 = startTimeStamp.clone ().add (30, 'minutes');
    console.log (new Date (+startTimeStamp), +startTimeStamp);
    console.log (
      (allEvents[+startTimeStamp.toString ()] || [])
        .concat (allEvents[+startTimeStampPlus30.toString ()] || [])
    );

    return allEvents[+startTimeStamp] || [];
  };

  render () {
    const {weekDays, showAddEventModal, currentEvent, allEvents} = this.state;
    return (
      <div>
        {/* Add Event Modal */}
        <AddEventModal
          visible={showAddEventModal}
          onCancel={this.onCloseAddEventModal}
          onOk={this.onOkAddEventModal}
          eventTitle={currentEvent.title}
          initialStartTime={currentEvent.startTimeStamp}
          initialEndTime={currentEvent.endTimeStamp}
          onTitleChange={this.onTitleChange}
          onTimeChange={this.onCurrentEventTimeChange}
        />

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
                  <Col
                    style={{...style.col, ...style.slot}}
                    span={3}
                    onClick={() => this.openAddEventModal (day.timeStamp, time)}
                  >
                    {this.getEventsForThisTime (
                      day.timeStamp,
                      time,
                      allEvents
                    ).map (event => (
                      <EventDisplayer
                        top={this.getTopValueForEventDiplayer (event)}
                        highlightHeight={this.getHeightValueForEventDisplayer (
                          event
                        )}
                      />
                    ))}
                  </Col>
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
