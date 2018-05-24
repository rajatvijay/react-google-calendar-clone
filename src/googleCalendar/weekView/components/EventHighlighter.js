import React, {Component} from 'react';
import moment from 'moment';
import AddEventModal from './AddEventModal';
import {generateWeekViewCoordinates} from '../../utils';
class EventHighlighter extends Component {
  state = {
    showEditEventModal: false,
    eventNewStart: null,
    eventNewEnd: null,
  };

  /**
   * Deletes the event from the event list
  */
  deleteEvent = () => {
    this.props.onEventDelete (this.props.event.id);
    this.setState ({
      showEditEventModal: false,
    });
  };

  /**
   * Updates the event
   * @param {string} title - Updated title of the event
   */
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

  /**
   * Open the edit event modal and initializes the start and end time
   */
  openEditEventModal = () => {
    this.setState ({
      showEditEventModal: true,
      eventNewStart: this.props.event.start,
      eventNewEnd: this.props.event.end,
    });
  };

  /**
   * Set the updated start and end times the state of the event being edited
   * @param {arr: moment, moment} - Array containing start and end date of the event
   */
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
            ...generateWeekViewCoordinates (
              this.props.event,
              this.props.startDate
            ),
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
