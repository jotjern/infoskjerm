import moment from 'moment';
import { faCalendarAlt, faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OnlineLogo from './OnlineLogo';

import eventTypes from '../../eventTypes';

import './Event.css';

function Event({event}) {
  const eventStart = moment(event.event_start).format('DD.MM');
  const regStart = moment(event.attendance_event.registration_start);
  const regEnd = moment(event.attendance_event.registration_end);

  const regStarted = regStart.isBefore(moment());

  // 3840 x 2160

  const imgSrc = event.image?.thumb;

  return (
    <div className="event">
      {imgSrc ?
        <img className="thumb" src={imgSrc} alt="Event" /> :
        <OnlineLogo className="thumb" fillColor={eventTypes[event.event_type]?.color} />
      }
      <div className="data">
        <h2 className="title">{event.title}</h2>
        <span className='registration'>
          {regStarted ?
            <div className='reg-el'>
              <b>Påmelding Slutter:</b>
              <span className='reg-date-time'>
                <span>
                  <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '1rem' }} />
                  {regEnd.format('DD.MM')}
                </span>
                <span>
                  <FontAwesomeIcon icon={faClock} style={{ marginRight: '1rem' }} />
                  {regEnd.format('HH:mm')}
                </span>
              </span>
            </div>
            :
            <div className='reg-el'>
              <b>Påmelding Starter:</b>
              <span className='reg-date-time'>
                <span>
                  <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '1rem' }} />
                  {regStart.format('DD.MM')}
                </span>
                <span>
                  <FontAwesomeIcon icon={faClock} style={{ marginRight: '1rem' }} />
                  {regStart.format('HH:mm')}
                </span>
              </span>
            </div>
          }
        </span>
        <div className="info">
          <span className="info-line">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>{eventStart}</span>
          </span>
          <span className="info-line">
            <FontAwesomeIcon icon={faUser} />
            <span>{event.attendance_event.max_capacity ? `${event.attendance_event.number_of_seats_taken}/${event.attendance_event.max_capacity}` : '\u221E'}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Event;
