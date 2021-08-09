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
      <section className="hero-weather__top">
        <h2>{data.temp}°</h2>
        <div className="top__city-infos">
          <h3 className="top__city">{city}</h3>
          <p className="top__date">{date.format(data.date)}</p>
        </div>
        <div className="top__icon">
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={'weather-icon'}
            width={'70px'}
          />
          <span>{data.main}</span>
        </div>
      </section>

      <section className="hero-weather__bottom">
        <span>
          <FontAwesomeIcon className="details__icon" icon={faWind} />
          {data.wind_speed}
          <small>km/h</small>
        </span>
        <span>
          <FontAwesomeIcon className="details__icon" icon={faTint} />
          {data.humidity}
          <small>%</small>
        </span>
        <span>
          <FontAwesomeIcon className="details__icon" icon={faCloud} />
          {data.clouds}
          <small>%</small>
        </span>
        <span>
          <FontAwesomeIcon className="details__icon" icon={faMoon} />
          {getTime.format(data.sunset).toLowerCase()}
        </span>
      </section>
    </div>
  );
}

export default HeroWeather;
