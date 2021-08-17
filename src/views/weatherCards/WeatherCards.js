import './WeatherCards.css';
import Caroussel from 'components/Caroussel';

function WeatherCards({ data, locale }) {
  const day = Intl.DateTimeFormat(locale, {
    timeZone: data[0]?.timezone,
    weekday: 'long',
  });
  const checkDayIsToday = Intl.DateTimeFormat(locale, {
    timeZone: data[0]?.timezone,
    day: '2-digit',
  });
  const getTime = new Intl.DateTimeFormat(locale, {
    timeZone: data[0]?.timezone,
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Caroussel>
      {[...data].map((obj, i) => (
        <div className="grid-wrapper" key={i}>
          <div className="card__day">
            {checkDayIsToday.format(new Date()) ===
            checkDayIsToday.format(obj.date)
              ? 'Today'
              : day.format(obj.date)}
          </div>
          <hr />
          <img
            className="card-icon"
            src={`https://openweathermap.org/img/wn/${obj.icon}@2x.png`}
            alt={'weather-icon'}
          />

          <div className="card__details">
            <span>Humidity</span>
            <div className="card__details-value">
              {obj.humidity}
              <small>%</small>
            </div>
          </div>

          <hr />

          <div className="card__details">
            <span>Cloudy</span>
            <div>
              {obj.clouds}
              <small>%</small>
            </div>
          </div>

          <hr />

          <div className="card__details">
            <span>Wind</span>
            <div>
              {obj.wind_speed}
              <small>km/h</small>
            </div>
          </div>

          <hr />

          <div className="card__details">
            <span>Sunrise</span>
            <small className="sun-time">
              {getTime.format(obj.sunrise).toLowerCase()}
            </small>
          </div>

          <div className="card__details">
            <span>Sunset</span>
            <small className="sun-time">
              {getTime.format(obj.sunset).toLowerCase()}
            </small>
          </div>

          <hr />

          <div className="card__details">
            <span>Max temp.</span>
            {obj.max_temp}°
          </div>

          <div className="card__details">
            <span>Min temp.</span>
            {obj.min_temp}°
          </div>
          <div className="temp">{obj.temp}˚</div>
        </div>
      ))}
    </Caroussel>
  );
}
export default WeatherCards;
