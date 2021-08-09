import '@fontsource/roboto';
import '@fontsource/roboto/500.css';
import './App.css';
import { useState } from 'react';
import Sidebar from './views/sidebar/Sidebar';
import Hero from './views/hero/Hero';
import Logo from './components/Logo';
import HeroWeather from './views/hero/heroWeather/HeroWeather';
import BackdropLoad from './components/BackdropLoad';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTint,
  faCloud,
  faWind,
  faMoon,
  faSun,
  faChevronDown,
  faThermometerEmpty,
  faThermometerThreeQuarters,
  faBinoculars,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faTint,
  faCloud,
  faWind,
  faMoon,
  faSun,
  faBinoculars,
  faChevronDown,
  faThermometerEmpty,
  faThermometerThreeQuarters
);

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const locale = navigator.language;

  return (
    <div className="App">
      <Hero>
        <Logo />
        {isLoading ? (
          <BackdropLoad open={isLoading} />
        ) : (
          data.length > 0 && (
            <HeroWeather data={data[0]} city={city} locale={locale} />
          )
        )}
      </Hero>

      <Sidebar
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setCity={setCity}
        data={data}
        setData={setData}
        locale={locale}
      />
    </div>
  );
}

export default App;
