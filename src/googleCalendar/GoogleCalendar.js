import React, {Component} from 'react';
import WeekView from './weekView';
import moment from 'moment';
import CalendarEventHandler from './calendarEventHandler';

class GoogleCalendar extends Component {
  state = {
    events: {},
  };

  addNewEvent = event => {
    event = {
      ...event,
      id: CalendarEventHandler.generateId (event),
    };
    this.setState (previousSate => ({
      events: CalendarEventHandler.add (previousSate.events, event),
    }));
  };

  // Fix this
  updateEvent = (eventId, updatedEvent) => {
    this.setState (previousState => {
      return {
        events: CalendarEventHandler.update (
          eventId,
          updatedEvent,
          previousState.events
        ),
      };
    });
  };

  deleteEvent = eventId => {
    this.setState (previousState => {
      return {
        events: CalendarEventHandler.delete (eventId, previousState.events),
      };
    });
  };

  render () {
    const {events} = this.state;
    return (
      <WeekView
        events={events}
        onNewEvent={this.addNewEvent}
        onEventUpdate={this.updateEvent}
        onEventDelete={this.deleteEvent}
      />
    );
  }
}

export default GoogleCalendar;
