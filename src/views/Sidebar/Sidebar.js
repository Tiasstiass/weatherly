import './Sidebar.css';
import { getCity, getWeatherData } from '../../api/Api';
import { useState, useEffect } from 'react';
import SidebarWeather from '../SidebarWeather/SidebarWeather';
import Chart from '../../components/Chart';
import Search from '../../components/Input';

function Sidebar({ setCity, data, setData, locale, isLoading, setIsLoading }) {
  const [isError, setIsError] = useState({ state: false, message: '' });

  // Get user's location //
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lon } = pos.coords;
          // Get city name from data received //
          getCity(lat, lon).then(
            (res) =>
              // update city state //
              setCity(
                res.data[0].name
                // call API with location coords //
              ),
            callApi(lat, lon)
          );
        },
        ({ message }) => alert(`Cannot access location: ${message}`)
      );
    }
    // eslint-disable-next-line
  }, []);

  // Main call API function with coords //
  const callApi = (lat, lon) => {
    // Set loading to true
    setIsLoading(true);
    getWeatherData(lat, lon)
      .then((res) => {
        // console.log(res);
        // Create object with data received from API //
        let weatherData = [res.data.current, ...res.data.daily.slice(1)].map(
          (obj) => ({
            day: Intl.DateTimeFormat(locale, {
              weekday: 'long',
            }).format(obj.dt * 1000),
            date: obj.dt * 1000,
            humidity: `${obj.humidity}%`,
            main: obj.weather[0].main,
            desc: obj.weather[0].description,
            icon: obj.weather[0].icon,
            temp: Math.round(obj.temp.day) || Math.round(obj.temp),
            min_temp: `${Math.round(obj.temp.min)}°` || undefined,
            sunrise: obj.sunrise * 1000,
            sunset: obj.sunset * 1000,
            wind_speed: `${Math.round(obj.wind_speed * 3.6)}km/h`,
            clouds: `${obj.clouds}%`,
          })
        );
        setData(weatherData);
        setIsLoading(false);
        setIsError(false);
      })
      .catch(({ response }) => {
        setIsError({ state: false, message: response.data.message });
        setData('');
        setIsLoading(false);
      });
  };
  return (
    <div className="sidebar">
      <Search setCity={setCity} callApi={callApi} />
      {isError.state ?? <p>{isError.message}</p>}
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
