import React, {Component} from 'react';
import WeekView from './weekView';

class GoogleCalendar extends Component {
  state = {
    events: [],
  };

  addNewEvent = event => {
    event = {
      ...event,
      id: event.start + event.title + event.end,
    };
    this.setState (previousSate => ({
      events: [...previousSate.events, event],
    }));
  };

  updateEvent = (eventId, updatedEvent) => {
    this.setState (previousState => {
      return {
        events: previousState.events.map (
          event => (event.id === eventId ? {...event, ...updatedEvent} : event)
        ),
      };
    });
  };

  deleteEvent = eventId => {
    this.setState (previousState => {
      return {
        events: previousState.events.filter (event => event.id !== eventId),
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
