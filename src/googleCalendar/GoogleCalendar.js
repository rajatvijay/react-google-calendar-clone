import React, {Component} from 'react';
import WeekView from './weekView';
import moment from 'moment';

function appendEvents (allEvents, newEvent) {
  const time = moment (newEvent.start).hours ();
  const eventWithMeatInfo = {
    ...newEvent,
    startWeek: moment (newEvent.start).week (),
    endWeek: moment (newEvent.end).week (),
  };
  if (allEvents[time]) {
    allEvents[time].push (eventWithMeatInfo);
  } else {
    allEvents[time] = [eventWithMeatInfo];
  }
  return {...allEvents};
}

function generateUniqueId({start, title, end}) {
  return start + title + end;
}

function deleteEvent (eventId, allEvents) {
  Object.keys (allEvents).forEach (time => {
    allEvents[time] = allEvents[time].filter (event => event.id !== eventId);
  });
  return {...allEvents};
}

class GoogleCalendar extends Component {
  state = {
    events: {},
  };

  addNewEvent = event => {
    event = {
      ...event,
      id: generateUniqueId (event),
    };
    this.setState (previousSate => ({
      events: appendEvents (previousSate.events, event),
    }));
  };

  // Fix this
  updateEvent = (eventId, updatedEvent) => {
    this.setState (previousState => {
      const oldEvents = previousState.events;
      const newEvents = appendEvents (
        deleteEvent (eventId, oldEvents),
        updatedEvent
      );
      return {
        events: newEvents,
      };
    });
  };

  deleteEvent = eventId => {
    this.setState (previousState => {
      return {
        events: deleteEvent (eventId, previousState.events),
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
