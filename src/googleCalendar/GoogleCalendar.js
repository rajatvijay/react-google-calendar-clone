import React, {Component} from 'react';
import WeekView from './weekView';
import CalendarEventHandler from './calendarEventHandler';

class GoogleCalendar extends Component {
  state = {
    events: {},
  };

  /**
   * Add new event in the event list in the state
   * @param event :Object
   * {
   *  start: Time stamp for the start of the event :timeStamp,
   *  title: Title fo the new event :String,
   *  end: Time stamp for the end of the event :timeStamp,
   * }
  */
  addNewEvent = event => {
    event = {
      ...event,
      id: CalendarEventHandler.generateId (event),
    };
    this.setState (previousSate => ({
      events: CalendarEventHandler.add (previousSate.events, event),
    }));
  };

  /**
   * Updates an already existing event in the state event list
   * @param event eventID id of the event :String
   * @param updatedEvent updated details of the event :Object
   * {
   *  start: Time stamp for the start of the event :timeStamp,
   *  title: Title fo the new event :String,
   *  end: Time stamp for the end of the event :timeStamp,
   * }
  */
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

  /**
   * Deletes an event from the event list in the state
   * @param eventId id of the event :String
  */
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
