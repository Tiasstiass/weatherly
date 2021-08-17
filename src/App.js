import '@fontsource/roboto';
import '@fontsource/roboto/500.css';
import './App.css';
import { useState, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import Mobile from 'views/mobile/Mobile';
import Desktop from 'views/desktop/Desktop';

function App() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInputLoading, setIsInputLoading] = useState(false);
  const [isError, setIsError] = useState({ state: false, message: '' });
  const input = useRef(' ');
  const locale = navigator.language;

  const isMobileOrTablet = useMediaQuery({
    query: '(max-device-width: 1199px)',
  });
  const isDesktop = useMediaQuery({
    query: '(min-device-width: 1200px)',
  });

  return (
    <div className="App">
      {isMobileOrTablet && (
        <Mobile
          isError={isError}
          setIsError={setIsError}
          input={input}
          list={list}
          setList={setList}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          isInputLoading={isInputLoading}
          setIsInputLoading={setIsInputLoading}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          data={data}
          setData={setData}
          data0={data[0]}
          locale={locale}
        />
      )}
      {isDesktop && (
        <Desktop
          isError={isError}
          setIsError={setIsError}
          input={input}
          list={list}
          setList={setList}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          isInputLoading={isInputLoading}
          setIsInputLoading={setIsInputLoading}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          data={data}
          setData={setData}
          data0={data[0]}
          locale={locale}
        />
      )}
    </div>
  );
}

export default App;
