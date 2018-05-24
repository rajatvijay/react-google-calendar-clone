import React, {Component} from 'react';
import moment from 'moment';
import AddEventModal from './AddEventModal';

function getBoxQuadsFromEvent (event) {
  const start = moment (event.start);
  const end = moment (event.end);
  const duration = moment.duration (end.diff (start));
  // const offset =

  // Calculating Top
  const top = start.minutes () === 30 ? '50%' : '0%';

  // Calculating height
  const timeFactor = duration.hours () + duration.minutes () / 60;
  const height = timeFactor * 100 + '%';

  // Calculating width
  const daysDiff = duration.days ();
  const width = (daysDiff + 1) * 12.5 + '%';

  // Calculating Left
  const weekDay = start.weekday ();
  const left = (weekDay + 1) * 12.5 + '%';

  return {
    top,
    left,
    height,
    width,
  };
}

class EventHighlighter extends Component {
  state = {
    showEditEventModal: false,
    eventNewStart: null,
    eventNewEnd: null,
  };

  deleteEvent = () => {
    this.props.onEventDelete (this.props.event.id);
    this.setState ({
      showEditEventModal: false,
    });
  };

  updateEvent = title => {
    this.props.onEventUpdate (this.props.event.id, {
      title,
      start: this.state.eventNewStart,
      end: this.state.eventNewEnd,
    });
    this.setState ({
      showEditEventModal: false,
    });
  };

  openEditEventModal = () => {
    this.setState ({
      showEditEventModal: true,
      eventNewStart: this.props.event.start,
      eventNewEnd: this.props.event.end,
    });
  };

  onCurrentEventTimeChange = dates => {
    console.log ('called');
    this.setState ({
      eventNewStart: +dates[0],
      eventNewEnd: +dates[1],
    });
  };

  render () {
    const {showEditEventModal, eventNewStart, eventNewEnd} = this.state;
    return (
      <React.Fragment>
        <AddEventModal
          editMode={true}
          visible={showEditEventModal}
          onCancel={this.deleteEvent}
          onOk={this.updateEvent}
          eventStart={eventNewStart}
          eventEnd={eventNewEnd}
          onTimeChange={this.onCurrentEventTimeChange}
        />
        <div
          onClick={this.openEditEventModal}
          style={{
            ...getBoxQuadsFromEvent (this.props.event),
            position: 'absolute',
            background: 'green',
            border: '1px solid white',
            borderRadius: '4px',
            color: 'white',
            padding: '2px 4px',
            fontSize: '12px',
            zIndex: 1,
            cursor: 'pointer',
          }}
        >
          {this.props.event.title} <br />
          <span style={{fontSize: 10}}>
            {moment (this.props.event.start).format ('hh:mm a')}
            {' '}
            -
            {' '}
            {moment (this.props.event.end).format ('hh:mm a')}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default EventHighlighter;
