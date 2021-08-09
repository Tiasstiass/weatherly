import '@fontsource/roboto';
import '@fontsource/roboto/500.css';
import './App.css';
import { useState } from 'react';
import Hero from './views/hero/Hero';
import Logo from './components/Logo';
import Credit from './components/Credit';
import HeroWeather from './views/hero/heroWeather/HeroWeather';
import Sidebar from './views/sidebar/Sidebar';
import BackdropLoad from './components/BackdropLoad';

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
        <Credit />
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
