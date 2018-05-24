import React from 'react';
import moment from 'moment';

function getBoxQuadsFromEvent (event) {
  const start = moment (event.start);
  const end = moment (event.end);
  console.log (start);
  console.log (end);
  const duration = moment.duration (end.diff (start));
  console.log (duration);

  // Calculating Top
  const top = start.minutes () === 30 ? '50%' : '0%';

  // Calculating height
  const hoursDiff = end.hours () - start.hours ();
  const height = hoursDiff === 0 ? '50%' : hoursDiff * 100 + '%';

  // Calculating width
  const daysDiff = end.days () - start.days ();
  const width = (daysDiff + 1) * 12.5 + '%';

  // Calculating Left
  const weekDay = start.weekday ();
  const left = weekDay * 12.5 + '%';

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
      {props.event.title}
    </div>
  );
}

export default EventHighlighter;
