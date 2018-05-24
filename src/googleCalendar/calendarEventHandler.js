import moment from 'moment';

const CalendarEventHandler = (function () {
  function addEvent (allEvents, newEvent) {
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

  function updateEvent (eventId, updatedEvent, allEvents) {
    Object.keys (allEvents).forEach (time => {
      allEvents[time] = allEvents[time].map (
        event => (event.id === eventId ? {...event, updatedEvent} : event)
      );
    });
    return {...allEvents};
  }

  function getBoxQuadsFromEvent (event, startDate) {
    const start = moment (event.start);
    const end = moment (event.end);
    const duration = moment.duration (end.diff (start));
    const weekStart = moment (startDate);

    // Calculating Top
    const top = start.minutes () === 30 ? '50%' : '0%';

    // Calculating height
    const timeFactor = duration.hours () + duration.minutes () / 60;
    const height = timeFactor * 100;

    let left, width;
    if (weekStart.week () === start.week ()) {
      const weekDay = start.weekday ();
      left = (weekDay + 1) * 12.5;
    }

    if (
      weekStart.week () === start.week () &&
      weekStart.week () === end.week ()
    ) {
      const daysDiff = duration.days ();
      width = (daysDiff + 1) * 12.5 - 2;
    }

    if (
      weekStart.week () > start.week () &&
      weekStart.week () === end.week ()
    ) {
      const daysDiff = moment
        .duration (
          end.diff (
            weekStart
              .startOf ('week')
              .set ('hours', start.hours ())
              .set ('minutes', start.minutes ())
          )
        )
        .days ();
      width = (daysDiff + 1) * 12.5 - 2;
    }

    if (weekStart.week () > start.week ()) {
      left = 12.5;
    }

    if (weekStart.week () < end.week ()) {
      width = 100 - left;
    }

    return {
      top: top + '%',
      left: left + '%',
      height: height + '%',
      width: width + '%',
    };
  }

  return {
    add: addEvent,
    delete: deleteEvent,
    update: updateEvent,
    generateId: generateUniqueId,
    generateWeekViewCoordinates: getBoxQuadsFromEvent,
  };
}) ();

export default CalendarEventHandler;
