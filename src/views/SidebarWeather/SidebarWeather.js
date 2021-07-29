import './SidebarWeather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTint,
  faCloud,
  faMoon,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';

function SidebarWeather({ data, locale }) {
  const day = Intl.DateTimeFormat(locale, {
    weekday: 'long',
  });
  const getTime = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });

  const [isFlipped, setIsFlipped] = useState(false);

  const handleHover = (e) => {
    console.log(e);
    setIsFlipped(!isFlipped);
  };

  return (
    // <>
    <div className="sidebar-weather-container">
      {[...data].map((obj, i) => (
        <>
          <ReactCardFlip
            isFlipped={isFlipped}
            flipDirection="horizontal"
            infinite={true}
            key={i}
          >
            <div onClick={handleHover} className="weather__list-front">
              <div className="weather__list-day">{day.format(obj.date)}</div>

              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${obj.icon}@2x.png`}
                  alt={'weather-icon'}
                  width={'80px'}
                />
              </div>
              <div className="desc">{obj.desc}</div>
              <div className="temp">{obj.temp}˚</div>
            </div>

            <div onClick={handleHover} className="weather__list-back">
              <span className="back__info">Humidity</span>
              <div>
                <FontAwesomeIcon
                  className="weather__list-icons icon-humidity "
                  icon={faTint}
                  size="xs"
                ></FontAwesomeIcon>
                {obj.humidity}
              </div>
              <span className="back__info">Clouds</span>
              <div className="cloud">
                <FontAwesomeIcon
                  className="weather__list-icons"
                  icon={faCloud}
                  size="xs"
                ></FontAwesomeIcon>
                {obj.clouds}
              </div>
              <span className="back__info">Wind speed</span>
              <div>
                <FontAwesomeIcon
                  className="weather__list-icons"
                  icon={faWind}
                  size="xs"
                ></FontAwesomeIcon>
                {obj.wind_speed}
              </div>
              <span className="back__info">Min. temp.</span>
              <div className="min-temp">{obj.min_temp}</div>
            </div>
          </ReactCardFlip>
        </>
      ))}
    </div>
  );
}
export default SidebarWeather;

{
  /* <div
  onClick={handleHover}
  className="weather__list-back"
  style={{ border: '1px solid green' }}
>
  <div>
    <FontAwesomeIcon
      className="weather__list-icons icon-humidity "
      icon={faTint}
      size="xs"
    ></FontAwesomeIcon>
    {obj.humidity}
  </div>
  <div className="cloud">
    <FontAwesomeIcon
      className="weather__list-icons"
      icon={faCloud}
      size="xs"
    ></FontAwesomeIcon>
    {obj.clouds}
  </div>
  <div className="min-temp">{obj.min_temp}</div>
</div>; */
}
