import './SidebarWeather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import WeatherCard from '../../../components/WeatherCard';

// Styling elements
const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

function SidebarWeather({ data, locale }) {
  const classes = useStyles();

  const day = Intl.DateTimeFormat(locale, {
    timeZone: data[0]?.timezone,
    weekday: 'long',
  });
  const getTime = new Intl.DateTimeFormat(locale, {
    timeZone: data[0]?.timezone,
    hour: '2-digit',
    minute: '2-digit',
  });

  const [slide, setSlide] = useState([]);

  const _handleClick = (e) => {
    let i = e.currentTarget.dataset.id;
    const newState = [...slide];
    newState[i] = !newState[i];
    setSlide(newState);
  };

  return (
    <div className="grid-container">
      {[...data].map((obj, i) => (
        <WeatherCard
          key={i}
          index={i}
          slide={slide}
          handleClick={_handleClick}
          children={
            <div className="card">
              <div className="weather__list-day">
                {day.format(new Date()) === day.format(obj.date)
                  ? 'Today'
                  : day.format(obj.date)}
              </div>
              <hr />
              <img
                src={`https://openweathermap.org/img/wn/${obj.icon}@2x.png`}
                alt={'weather-icon'}
                width={'90px'}
              />
              <div className="temp">{obj.temp}˚</div>
              <IconButton
                data-id={i}
                className={slide[i] ? classes.expandOpen : 'close'}
                aria-expanded={true}
                aria-label="show more"
                onClick={_handleClick}
              >
                <FontAwesomeIcon className="icon-expand" icon={faChevronDown} />
              </IconButton>
            </div>
          }
          childrenSlide={
            <div className="card-slide">
              <span>Humidity</span>
              <div className="details-col">
                {obj.humidity}
                <small>%</small>
              </div>

              <hr className="separator-slide" />

              <span>Cloudy</span>
              <div className="details-col">
                {obj.clouds}
                <small>%</small>
              </div>

              <hr className="separator-slide" />

              <span>Wind</span>
              <div className="details-col">
                {obj.wind_speed}
                <small>km/h</small>
              </div>

              <hr className="separator-slide" />

              <span>Sunrise</span>
              <div className="details-col">
                {getTime.format(obj.sunrise).toLowerCase()}
              </div>

              <span>Sunset</span>
              <div className="details-col">
                {getTime.format(obj.sunset).toLowerCase()}
              </div>

              <div className="min-max-temp">
                <span>{obj.max_temp}°</span>

                <span className="min-temp">{obj.min_temp}°</span>
              </div>
              <div className="expand-btn">
                <IconButton
                  data-id={i}
                  className={slide[i] ? classes.expandOpen : ''}
                  aria-expanded={true}
                  aria-label="show less"
                  onClick={_handleClick}
                >
                  <FontAwesomeIcon
                    className="icon-expand-slide"
                    icon={faChevronDown}
                  />
                </IconButton>
              </div>
            </div>
          }
        />
      ))}
    </div>
  );
}
export default SidebarWeather;
