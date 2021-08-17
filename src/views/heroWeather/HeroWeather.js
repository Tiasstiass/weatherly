import './HeroWeather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind,
  faTint,
  faCloud,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';

function HeroWeather({ data, city, locale }) {
  const date = new Intl.DateTimeFormat(locale, {
    timeZone: data.timezone,
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  });
  const getTime = new Intl.DateTimeFormat(locale, {
    timeZone: data.timezone,
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="hero-weather">
      <section>
        <h2 className="hero__temp">{data.temp}°</h2>
        <div className="weather__city-date">
          <h3 className="hero__city">{city}</h3>
          <p className="hero__date">{date.format(data.date)}</p>
        </div>
        <div className="hero__icon">
          <img
            className="hero__img"
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={'weather-icon'}
            width={'70px'}
          />
          <span className="hero__description">{data.main}</span>
        </div>
      </section>

      <section className="hero__bottom">
        <span>
          <FontAwesomeIcon className="bottom_icons" icon={faWind} />
          {data.wind_speed}
          <small>km/h</small>
        </span>
        <span>
          <FontAwesomeIcon className="bottom_icons" icon={faTint} />
          {data.humidity}
          <small>%</small>
        </span>
        <span>
          <FontAwesomeIcon className="bottom_icons" icon={faCloud} />
          {data.clouds}
          <small>%</small>
        </span>
        <span>
          <FontAwesomeIcon className="bottom_icons" icon={faMoon} />
          {getTime.format(data.sunset).toLowerCase()}
        </span>
      </section>
    </div>
  );
}

export default HeroWeather;
