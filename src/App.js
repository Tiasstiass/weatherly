import '@fontsource/roboto';
import '@fontsource/roboto/500.css';
import './App.css';
import { useState } from 'react';
import BackdropLoad from './components/BackdropLoad';
import Sidebar from './views/Sidebar/Sidebar';
import ShowcaseWeather from './views/ShowcaseWeather/ShowcaseWeather';

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const locale = navigator.language;

  return (
    <div className="App">
      {isLoading ? (
        <BackdropLoad open={isLoading} />
      ) : (
        data.length > 0 && (
          <ShowcaseWeather data={data[0]} city={city} locale={locale} />
        )
      )}
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
