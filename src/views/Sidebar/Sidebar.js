import './Sidebar.css';
import { useState, useEffect, useRef } from 'react';
import { getCity, getWeatherData, getAutocomplete } from '../../api/Api';
import Search from '../../components/search/Search';
import Chart from '../../components/Chart';
import SidebarWeather from './sidebarWeather/SidebarWeather';

function Sidebar({ setCity, data, setData, isLoading, setIsLoading, locale }) {
  const [isError, setIsError] = useState({ state: false, message: '' });
  const input = useRef(' ');
  const [list, setList] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [isInputLoading, setIsInputLoading] = useState(false);

  // Get user's location //
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lon } = pos.coords;
          // get city name from data received //
          getCity(lat, lon).then(
            (res) =>
              // update city state //
              setCity(res.data[0].name),
            // call API //
            callApi(lat, lon)
          );
        },
        (error) => {
          setData([]);
          setIsError({
            state: true,
            message: `Cannot access location`,
          });
        }
      );
    }
    // eslint-disable-next-line
  }, []);

  // Main call API function with coords //
  const callApi = (lat, lon) => {
    setIsLoading(true);
    getWeatherData(lat, lon)
      .then((res) => {
        // create object with data received from API //
        let timezone = res.data.timezone;
        let weatherData = [res.data.current, ...res.data.daily].map((obj) => ({
          day: Intl.DateTimeFormat(locale, {
            timeZone: timezone,
            weekday: 'long',
          }).format(obj.dt * 1000),
          date: obj.dt * 1000,
          timezone: timezone,
          humidity: obj.humidity,
          main: obj.weather[0].main,
          icon: obj.weather[0].icon,
          temp: Math.round(obj.temp.day) || Math.round(obj.temp),
          min_temp: Math.round(obj.temp.min) || null,
          max_temp: Math.round(obj.temp.max) || null,
          sunrise: obj.sunrise * 1000,
          sunset: obj.sunset * 1000,
          wind_speed: Math.round(obj.wind_speed * 3.6),
          clouds: obj.clouds,
        }));
        setData(weatherData);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        setIsError({ state: true, message: '' });
        setIsLoading(false);
        setData([]);
      });
  };

  //// AUTOCOMPLETE ////
  // fetch cities by input
  const _handleInputChange = (e) => {
    input.current = e.target.value;
    if (input.current && input.current.length > 1) {
      setIsError({ state: false });
      setIsInputLoading(true);
      getAutocomplete(input.current)
        .then((res) => {
          let listItems = [...res.data.features].map((obj) => ({
            id: obj.properties.place_id,
            city: obj.properties.city,
            country: obj.properties.country,
            state: obj.properties.state_code || obj.properties.state || '',
            lat: obj.properties.lat,
            lon: obj.properties.lon,
          }));
          setList(listItems);
          setIsInputLoading(false);
        })
        .catch((err) => err);
    }
  };

  // save selected city infos
  const _handleInputSelect = (e, value, reason) => {
    if (reason === 'select-option') {
      setSelectedCity(value);
    }
    if (reason === 'clear') {
      setSelectedCity({});
    }
  };

  // call api with selected city infos & set name
  const _handleInputSubmit = (e) => {
    e.preventDefault();
    callApi(selectedCity.lat, selectedCity.lon);
    setCity(selectedCity.city);
  };

  return (
    <div className="sidebar">
      <Search
        handleChange={_handleInputChange}
        handleSelect={_handleInputSelect}
        handleSubmit={_handleInputSubmit}
        onOpen={setSelectedCity}
        input={input.current}
        options={list}
        error={isError.state}
        loading={isInputLoading}
      />
      {isError.state ? <p className="error-message">{isError.message}</p> : ''}
      {isLoading
        ? ''
        : data.length > 0 && (
            <Chart
              days={[...data.slice(1)].map((obj) => obj.day)}
              temp={[...data.slice(1)].map((obj) => obj.temp)}
            />
          )}
      {isLoading || <SidebarWeather data={data.slice(1)} locale={locale} />}
    </div>
  );
}

export default Sidebar;
