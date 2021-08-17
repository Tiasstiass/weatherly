// import './Mobile.css';
import { useEffect } from 'react';
import { getCity, getWeatherData, getAutocomplete } from 'api/Api';
import Logo from 'components/Logo';
import BackdropLoad from 'components/BackdropLoad';
import HeroWeather from 'views/heroWeather/HeroWeather';
import Search from 'components/search/Search';
import Chart from 'components/Chart';
import WeatherCards from 'views/weatherCards/WeatherCards';

export default function Desktop(props) {
  //// AUTOCOMPLETE ////

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
              props.setSelectedCity({
                city: res.data[0].name,
              }),

            // call API //
            callApi(lat, lon)
          );
        },
        (error) => {
          props.setData([]);
          props.setIsError({
            state: true,
            message: `Cannot access location`,
          });
        }
      );
    }
  }, []);

  //// AUTOCOMPLETE ////
  // fetch cities by input
  const _handleInputChange = (e) => {
    props.input.current = e.target.value;
    if (props.input.current && props.input.current.length > 1) {
      props.setIsError({ state: false });
      props.setIsInputLoading(true);
      getAutocomplete(props.input.current)
        .then((res) => {
          let listItems = [...res.data.features].map((obj) => ({
            id: obj.properties.place_id,
            city: obj.properties.city,
            country: obj.properties.country,
            state: obj.properties.state_code || obj.properties.state || '',
            lat: obj.properties.lat,
            lon: obj.properties.lon,
          }));
          props.setList(listItems);
          props.setIsInputLoading(false);
        })
        .catch((err) => err);
    }
  };
  // save selected city infos
  const _handleInputSelect = (e, value, reason) => {
    if (reason === 'select-option') {
      props.setSelectedCity(value);
    }
    if (reason === 'clear') {
      props.setList([]);
      props.setSelectedCity({});
    }
  };
  // call api with selected city infos & set name
  const _handleInputSubmit = (e) => {
    e.preventDefault();
    if (props.selectedCity.city) {
      callApi(props.selectedCity.lat, props.selectedCity.lon);
    }
  };

  // Main call API function with coords
  const callApi = (lat, lon) => {
    props.setIsLoading(true);
    getWeatherData(lat, lon)
      .then((res) => {
        // create object with data received from API //
        let timezone = res.data.timezone;
        let weatherData = [res.data.current, ...res.data.daily].map((obj) => ({
          day: Intl.DateTimeFormat(props.locale, {
            timeZone: timezone,
            weekday: 'long',
          }).format(obj.dt * 1000),
          date: obj.dt * 1000,
          city: props.selectedCity.city,
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
        props.setData(weatherData);
        props.setIsLoading(false);
        props.setIsError(false);
      })
      .catch((error) => {
        props.setIsLoading(false);
        props.setData([]);
      });
  };
  return (
    <>
      <div className="hero">
        <Logo />
        {props.isLoading ? (
          <BackdropLoad open={props.isLoading} />
        ) : (
          props.data.length > 0 && (
            <HeroWeather
              data={props.data0}
              city={props.data0.city}
              locale={props.locale}
            />
          )
        )}
      </div>
      <div className="sidebar">
        <Search
          handleChange={_handleInputChange}
          handleSelect={_handleInputSelect}
          handleSubmit={_handleInputSubmit}
          onOpen={props.setSelectedCity}
          input={props.input.current}
          options={props.list}
          error={props.isError.state}
          loading={props.isInputLoading}
        />
        {props.isError.state ? (
          <p className="error-message">{props.isError.message}</p>
        ) : (
          ''
        )}
        {props.isLoading
          ? ''
          : props.data.length > 0 && (
              <Chart
                days={[...props.data.slice(1)].map((obj) => obj.day)}
                temp={[...props.data.slice(1)].map((obj) => obj.temp)}
              />
            )}
        {props.isLoading || (
          <WeatherCards data={props.data.slice(1)} locale={props.locale} />
        )}
      </div>
    </>
  );
}
