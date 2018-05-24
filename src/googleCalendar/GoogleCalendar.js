import React, {Component} from 'react';
import WeekView from './weekView';

class GoogleCalendar extends Component {
  state = {
    events: [],
  };

  handleNewEvent = event => {
    this.setState (previousSate => ({
      events: [...previousSate.events, event],
    }));
  };

  render () {
    const {events} = this.state;
    return <WeekView events={events} onNewEvent={this.handleNewEvent} />;
  }
}

export default GoogleCalendar;
