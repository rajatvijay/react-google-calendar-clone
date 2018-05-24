import React from 'react';
import moment from 'moment';

function getBoxQuadsFromEvent (event) {
  const start = moment (event.start);
  const end = moment (event.end);
  const duration = moment.duration (end.diff (start));

  // Calculating Top
  const top = start.minutes () === 30 ? '50%' : '0%';

  // Calculating height
  const timeFactor = duration.hours () + duration.minutes () / 60;
  const height = timeFactor * 100 + '%';

  // Calculating width
  const daysDiff = duration.days ();
  const width = (daysDiff + 1) * 12.5 - 2 + '%';

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

function EventHighlighter (props) {
  console.log ('event highlighter');
  return (
    <div
      style={{
        ...getBoxQuadsFromEvent (props.event),
        position: 'absolute',
        background: 'green',
        border: '1px solid white',
        borderRadius: '4px',
        color: 'white',
        padding: '2px 4px',
        fontSize: '12px',
      }}
    >
      {props.event.title} <br />
      <span style={{fontSize: 10}}>
        {moment (props.event.start).format ('hh:mm a')}
        {' '}
        -
        {' '}
        {moment (props.event.end).format ('hh:mm a')}
      </span>
    </div>
  );
}

export default EventHighlighter;
