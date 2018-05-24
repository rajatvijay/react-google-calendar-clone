import React, {Component} from 'react';
import moment from 'moment';
import AddEventModal from './AddEventModal';
import WeekToolbar from './WeekToolbar';
import WeekHeader from './WeekHeader';
import TimeSlotGroup from './TimeSlotGroup';
import EventHighlighter from './EventHighlighter';
import {times, getAllDaysInTheWeek} from '../../utils';

class WeekView extends Component {
  state = {
    startDate: +moment (),
    weekDays: getAllDaysInTheWeek (),
    showAddEventModal: false,
    eventStart: null,
    eventEnd: null,
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
    const start = moment (dateStamp).set ('hour', time);
    const end = start.clone ().add (1, 'hour');

    this.setState ({
      showAddEventModal: true,
      eventStart: +start,
      eventEnd: +end,
    });
  };

  onCloseAddEventModal = () => {
    this.setState ({
      showAddEventModal: false,
    });
  };

  onOkAddEventModal = title => {
    this.props.onNewEvent ({
      title,
      start: this.state.eventStart,
      end: this.state.eventEnd,
    });
    this.setState ({
      showAddEventModal: false,
    });
  };

  onCurrentEventTimeChange = dates => {
    this.setState ({
      eventStart: +dates[0],
      eventEnd: +dates[1],
    });
  };

  render () {
    const {
      weekDays,
      showAddEventModal,
      eventStart,
      eventEnd,
      startDate,
    } = this.state;
    const {events} = this.props;
    return (
      <div>

        <AddEventModal
          visible={showAddEventModal}
          onCancel={this.onCloseAddEventModal}
          onOk={this.onOkAddEventModal}
          eventStart={eventStart}
          eventEnd={eventEnd}
          onTimeChange={this.onCurrentEventTimeChange}
        />

        <WeekToolbar
          goToPreviousWeek={this.goToPreviousWeek}
          goToNextWeek={this.goToNextWeek}
          startDate={startDate}
        />

        <WeekHeader weekDays={weekDays} />

        {times.map (time => (
          <TimeSlotGroup
            key={time}
            time={time}
            weekDays={weekDays}
            events={events[time]}
            openAddEventModal={this.openAddEventModal}
          >
            {events[time] &&
              events[time].map (
                event =>
                  event.startWeek <= moment (startDate).week () &&
                  event.endWeek >= moment (startDate).week () &&
                  <EventHighlighter
                    onEventDelete={this.props.onEventDelete}
                    onEventUpdate={this.props.onEventUpdate}
                    key={event.title + event.end + event.start}
                    startDate={startDate}
                    event={event}
                  />
              )}
          </TimeSlotGroup>
        ))}
      </div>
    );
  }
}

export default WeekView;
