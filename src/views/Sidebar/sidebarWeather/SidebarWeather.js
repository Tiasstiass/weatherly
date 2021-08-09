import './SidebarWeather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
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

  // create slide state for each object
  useEffect(() => {
    if (data.length > 0) {
      const initState = data.map((obj) => obj.isSlid);
      setSlide(initState);
    }
  }, [data]);

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
                <FontAwesomeIcon className="icon-expand" icon="chevron-down" />
              </IconButton>
            </div>
          }
          childrenSlide={
            <div className="card-slide">
              <FontAwesomeIcon
                className="weather__list-icons icon-humid"
                icon="tint"
                fixedWidth
              />
              <div className="details-col">
                {obj.humidity}
                <small>%</small>
              </div>

              <hr className="line-slide" />

              <FontAwesomeIcon
                className="weather__list-icons"
                icon="cloud"
                fixedWidth
              />
              <div className="details-col">
                {obj.clouds}
                <small>%</small>
              </div>

              <hr className="line-slide" />

              <FontAwesomeIcon
                className="weather__list-icons"
                icon="wind"
                fixedWidth
              />
              <div className="details-col">
                {obj.wind_speed}
                <small> km/h</small>
              </div>

              <hr className="line-slide" />

              <FontAwesomeIcon
                className="weather__list-icons"
                icon="sun"
                fixedWidth
              />
              <div className="details-col">
                {getTime.format(obj.sunrise).toLowerCase()}
              </div>

              <hr className="line-slide" />

              <FontAwesomeIcon
                className="weather__list-icons icon-sunset"
                icon="moon"
                fixedWidth
              />
              <div className="details-col">
                {getTime.format(obj.sunset).toLowerCase()}
              </div>

              <hr className="line-slide" />
              {/* <FontAwesomeIcon
                className="weather__list-icons icon-sunset"
                icon="binoculars"
                fixedWidth
              />
              <div className="details-col">{obj.visibility}</div> */}
              <div className="min-max-temp">
                <div className="min-temp">
                  <FontAwesomeIcon
                    className="weather__list-icons icon-min"
                    icon="thermometer-empty"
                  />
                  {obj.min_temp}°
                </div>
                <div>
                  <FontAwesomeIcon
                    className="weather__list-icons icon-max"
                    icon="thermometer-three-quarters"
                  />
                  {obj.max_temp}°
                </div>
              </div>
              <div className="expand-btn">
                <IconButton
                  data-id={i}
                  // className={slide[i] ? classes.expandOpen : ''}
                  aria-expanded={true}
                  aria-label="show less"
                  onClick={_handleClick}
                >
                  <FontAwesomeIcon
                    className="icon-expand-slide"
                    icon="chevron-down"
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

// {/* <table className="card-slide">
//                 <tr>
//                   <td>
//                     <FontAwesomeIcon
//                       className="weather__list-icons icon-humidity "
//                       icon="tint"
//                       fixedWidth
//                     />
//                   </td>
//                   <td className="slide-values">
//                     {obj.humidity}
//                     <small>%</small>
//                   </td>
//                 </tr>
//                 {/* <hr className="line-slide" /> */}

//                 <tr>
//                   <td>
//                     <FontAwesomeIcon
//                       className="weather__list-icons icon-cloud"
//                       icon="cloud"
//                       fixedWidth
//                     />
//                   </td>
//                   <td className="slide-values cloud">
//                     {obj.clouds}
//                     <small>%</small>
//                   </td>
//                 </tr>
//                 {/* <hr className="line-slide" /> */}

//                 <tr>
//                   <td className="slide-icon">
//                     <FontAwesomeIcon
//                       className="weather__list-icons"
//                       icon="wind"
//                       fixedWidth
//                     />
//                   </td>
//                   <td className="slide-values">
//                     {obj.wind_speed}
//                     <small> km/h</small>
//                   </td>
//                 </tr>
//                 {/* <hr className="line-slide" /> */}

//                 <tr>
//                   <td className="slide-icon">
//                     <FontAwesomeIcon
//                       className="weather__list-icons icon-sunrise"
//                       icon="sun"
//                       fixedWidth
//                     />
//                   </td>
//                   <td className="slide-values">
//                     <div>{getTime.format(obj.sunrise).toLowerCase()}</div>
//                   </td>
//                 </tr>
//                 {/* <hr className="line-slide" /> */}

//                 <tr>
//                   <td className="slide-icon">
//                     <FontAwesomeIcon
//                       className="weather__list-icons icon-sunset"
//                       icon="moon"
//                       fixedWidth
//                     />
//                   </td>
//                   <td className="slide-values">
//                     <div>{getTime.format(obj.sunset).toLowerCase()}</div>
//                   </td>
//                 </tr>
//               </table>
//               <div className="expand-btn">
//                 <IconButton
//                   data-id={i}
//                   className={slide[i] ? classes.expandOpen : ''}
//                   aria-expanded={true}
//                   aria-label="show more"
//                   onClick={_handleClick}
//                 >
//                   <FontAwesomeIcon
//                     className="icon-expand-slide"
//                     icon="chevron-down"
//                   />
//                 </IconButton>
//               </div> */}

{
  /* <div className="card-slide">
                <div className="slide-row">
                  <FontAwesomeIcon
                    className="weather__list-icons icon-humidity "
                    icon="tint"
                    fixedWidth
                  />
                  <div>
                    {obj.humidity}
                    <small>%</small>
                  </div>
                </div>
                <hr className="line-slide" />
                <div className="slide-row cloud">
                  <FontAwesomeIcon
                    className="weather__list-icons icon-cloud"
                    icon="cloud"
                    fixedWidth
                  />
                  <div>
                    {obj.clouds}
                    <small>%</small>
                  </div>
                </div>
                <hr className="line-slide" />

                <div className="slide-row">
                  <FontAwesomeIcon
                    className="weather__list-icons"
                    icon="wind"
                    fixedWidth
                  />
                  <div>
                    {obj.wind_speed}
                    <small> km/h</small>
                  </div>
                </div>

                <hr className="line-slide" />
                <div className="slide-row">
                  <FontAwesomeIcon
                    className="weather__list-icons icon-sunrise"
                    icon="sun"
                    fixedWidth
                  />
                  <div>{getTime.format(obj.sunrise).toLowerCase()}</div>
                </div>
                <hr className="line-slide" />
                <div className="slide-row">
                  <FontAwesomeIcon
                    className="weather__list-icons icon-sunset"
                    icon="moon"
                    fixedWidth
                  />
                  <div>{getTime.format(obj.sunset).toLowerCase()}</div>
                </div>
                <div className="slide-row">
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
                        icon="chevron-down"
                      />
                    </IconButton>
                  </div>
                </div>
              </div> */
}
