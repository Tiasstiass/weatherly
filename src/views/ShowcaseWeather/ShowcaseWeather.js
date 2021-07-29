import './ShowcaseWeather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTint,
  faMoon,
  faWind,
  faCloud,
} from '@fortawesome/free-solid-svg-icons';

function ShowcaseWeather({ data, city, locale }) {
  const date = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  });
  const getTime = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="showcase-weather-container">
      <div className="showcase-weather">
        <section className="showcase-weather__top">
          <h1>{data.temp}°</h1>
          <div className="top__city-infos">
            <h2 className="top__city">{city}</h2>
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

        <section className="showcase-weather__bottom">
          <span className="bottom__details">
            <FontAwesomeIcon className="details__icon" icon={faWind} />
            {data.wind_speed}
          </span>
          <span className="bottom__details">
            <FontAwesomeIcon className="details__icon" icon={faTint} />
            {data.humidity}
          </span>
          <span className="bottom__details">
            <FontAwesomeIcon className="details__icon" icon={faCloud} />
            {data.clouds}
          </span>
          <span className="bottom__details">
            <FontAwesomeIcon className="details__icon" icon={faMoon} />
            {getTime.format(data.sunset)}
          </span>
        </section>
      </div>
    </div>
  );
}

export default ShowcaseWeather;
