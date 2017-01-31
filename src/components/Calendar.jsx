/*
Modified from: http://jsfiddle.net/rdiaz/4brnfhb0/
 */

import React, {Component, PropTypes} from 'react';
import classNames from 'classname';
import _ from 'lodash';
import '../style/calendar.css';

const DAYS_OF_WEEK = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

/* Helpers */
const padLeft = (number, padding) => (
    padding.substring(number.toString().length) + number
);

const toTimeString = (hours, minutes) => (
    `${padLeft(hours, '00')}:${padLeft(minutes, '00')}`
);

const startOfWeek = (date) => {
  const clone = new Date(date);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  clone.setDate(diff);

  return clone;
};

const addDays = (date, days) => {
  const clone = new Date(date);
  clone.setDate(clone.getDate() + days);

  return clone;
};

/* PropTypes */
const appointmentPropType = PropTypes.shape({
  name: PropTypes.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  blockSpan: PropTypes.number
});

const appointmentsPropType = PropTypes.arrayOf(appointmentPropType);

/* COMPONENTS */
class Calendar extends Component {
  static propTypes = {
    appointments: PropTypes.shape({
      monday: appointmentsPropType.isRequired,
      tuesday: appointmentsPropType.isRequired,
      wednesday: appointmentsPropType.isRequired,
      thursday: appointmentsPropType.isRequired,
      friday: appointmentsPropType.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.normalizeTimeBlocks(props.appointments);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appointments !== nextProps.appointments) {
      this.normalizeTimeBlocks(nextProps.appointments);
    }
  }

  normalizeTimeBlocks = (appointments) => {
    const timeInterval = 5;
    const blockSize = 30;
    const ratio = timeInterval / blockSize;
    const timeBlocks = {};
    const eventBlocks = {};
    let earliestStartHour = 11;
    let latestEndHour = 14;

    _.forEach(appointments, (appointmentsByDay, day) => {
      _.forEach(appointmentsByDay, (appointment) => {
        const startTime = appointment.startTime;
        const endTime = appointment.endTime;

        const startSplit = startTime.split(':');
        const endSplit = endTime.split(':');
        let startHour = parseInt(startSplit[0], 10);
        let startMinutes = parseInt(startSplit[1], 10);
        let endHour = parseInt(endSplit[0], 10);

        let blockStartMinutes = startMinutes;
        let blockTopOffsetSpan = 0;
        for(let block = blockSize; block <= 60; block += blockSize){
          if(block > blockStartMinutes){
            blockTopOffsetSpan = (blockStartMinutes - (block - blockSize))/blockSize;
            blockStartMinutes = block - blockSize;
            break;
          }
        }
        const blockStartTime = toTimeString(startHour, blockStartMinutes);

        earliestStartHour = Math.min(startHour, earliestStartHour);
        latestEndHour = Math.max(endHour, latestEndHour);

        let blockSpan = 0;

        if (startTime === '00:00' && endTime === '00:00') {
          blockSpan = Math.ceil(24 * 60 / blockSize);
        }
        else {
          let timeString = appointment.startTime;
          while (timeString !== appointment.endTime) {
            blockSpan += ratio;
            startMinutes += timeInterval;

            if (startMinutes >= 60) {
              startMinutes = 0;
              startHour += 1;
            }

            timeString = toTimeString(startHour, startMinutes);
          }
        }

        eventBlocks[blockStartTime] = eventBlocks[blockStartTime] || {};
        eventBlocks[blockStartTime][day] = Object.assign({}, appointment, {blockSpan}, {blockTopOffsetSpan});
      });
    });

    for (let hour = earliestStartHour; hour <= latestEndHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += blockSize) {
        const timeString = toTimeString(hour, minutes);

        timeBlocks[timeString] = eventBlocks[timeString] || {};
      }
    }

    this.timeBlocks = timeBlocks;
  };

  render() {
    const rows = [];

    _.forEach(this.timeBlocks, (block, time) => {
      rows.push(
          <Row key={time}>
            <TimeCell className="calendar__cell--time-col">{time}</TimeCell>
            <AppointmentCell className="calendar__cell--time-spacing" />
            <AppointmentCell appointment={block.monday} />
            <AppointmentCell appointment={block.tuesday} />
            <AppointmentCell appointment={block.wednesday} />
            <AppointmentCell appointment={block.thursday} />
            <AppointmentCell appointment={block.friday} />

          </Row>
      );
    });

    const monday = startOfWeek(new Date());

    return (
        <div className="calendar">
          <Row>
            <HeaderCell className="calendar__cell--time-col" />
            <Cell className="calendar__cell--time-spacing" />
            <HeaderCell day={monday} />
            <HeaderCell day={addDays(monday, 1)} />
            <HeaderCell day={addDays(monday, 2)} />
            <HeaderCell day={addDays(monday, 3)} />
            <HeaderCell day={addDays(monday, 4)} />
          </Row>

          <div className="calendar__body">
            {rows}

            <Row className="calendar__row--deco-last-row">
              <TimeCell className="calendar__cell--time-col">Party</TimeCell>
              <AppointmentCell />
            </Row>

            {this.props.showCurrentTimeIndicator? <CurrentTimeIndicator />:''}

          </div>
        </div>
    );
  }
}

class CurrentTimeIndicator extends Component {
  state = {
    now: new Date(),
  };

  componentDidMount() {
    const seconds = this.state.now.getSeconds();

    this.timeout = setTimeout(() => {
      this.updateDate();
      this.interval = setInterval(this.updateDate, 60 * 1000);
    }, (60 - seconds) * 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
  }

  updateDate = () => {
    this.setState({
      now: new Date(),
    });
  };

  getPercentage = () => {
    const { now } = this.state;
    const minutesPassed = now.getHours() * 60 + now.getMinutes();

    return minutesPassed * 100 / 1440;
  };

  render() {
    const { now } = this.state;
    const style = {
      top: this.getPercentage() + '%'
    };

    return (
        <div className="calendar__current-time" style={style}>
          <div className="calendar__current-time__text">
            {toTimeString(now.getHours(), now.getMinutes())}
          </div>
        </div>
    );
  }
};

const Appointment = (props) => {
  const { appointment } = props;
  const wholeDay = appointment.startTime === '00:00' &&
      appointment.endTime === '00:00';

  const time = wholeDay ?
      'Whole Day' :
      `${appointment.startTime} - ${appointment.endTime}`;

  const className = `calendar__appointment colour-group-${appointment.group || '1'}`;
  return (
      <div style={props.style} className={className}>
        <div className="calendar__appointment__time">
          {time}
        </div>
        <div className="calendar__appointment__name">
          {appointment.name}
        </div>
      </div>
  );
};

Appointment.propTypes = {
  appointment: appointmentPropType
};

const Row = (props) => (
    <div {...props}
         className={classNames('calendar__row', props.className)}
    />
);

const Cell = (props) => (
    <div {...props}
         className={classNames('calendar__cell', props.className)}
    />
);

const HeaderCell = (props) => {
  const { day } = props;

  return (
      <Cell
            className={
              classNames('calendar__cell--day-of-week', props.className)
            }
      >
        {day &&
          <div className="calendar__cell--day-of-week__day">
            {DAYS_OF_WEEK[day.getDay()]}
          </div>
        }
      </Cell>
  );
};

HeaderCell.propTypes = {
  day: PropTypes.instanceOf(Date)
};

const TimeCell = (props) => (
    <Cell {...props}
          className={classNames('calendar__cell--time', props.className)}
    />
);

const AppointmentCell = (props) => {
  const { appointment } = props;
  let appointmentComponent = null;

  if (appointment) {
    const { blockSpan, blockTopOffsetSpan } = appointment;
    const height = (100 * blockSpan) + '%';
    const borderPixels = (blockSpan + 1) + 'px';
    const cssHeight = 'calc(' + height + ' + ' + borderPixels + ')';
    const top = (100 * blockTopOffsetSpan) + '%';
    const cssTop = 'calc(' + top + ' - 1px)';

    appointmentComponent = (
        <Appointment group={appointment.group} style={{ top: cssTop, height: cssHeight }} appointment={appointment} />
    );
  }

  return (
      <Cell
            className={classNames('calendar__cell--appointment', props.className)}
      >
        {appointmentComponent}
      </Cell>
  );
};

AppointmentCell.propTypes = {
  appointment: appointmentPropType
};

export default Calendar;

//
// const App = (props) => (
//     <div className="container">
//       <Calendar {...props} />
//     </div>
// );
//
// /* INIT */
// const renderCalendar = (appointments) => {
//   ReactDOM.render(
//       <App appointments={appointments} />,
//       document.getElementById('root')
//   );
// };
//
// renderCalendar({
//   monday: [
//     { name: 'Gustavo', startTime: '08:00', endTime: '09:00' },
//     { name: 'Felipe', startTime: '09:30', endTime: '11:00' },
//     { name: 'Cony', startTime: '18:00', endTime: '18:30' }
//   ],
//   tuesday: [],
//   wednesday: [
//     { name: 'Nicole', startTime: '11:30', endTime: '14:00' }
//   ],
//   thursday: [
//     { name: 'Alejandro', startTime: '00:00', endTime: '00:00' }
//   ],
//   friday: []
// });
