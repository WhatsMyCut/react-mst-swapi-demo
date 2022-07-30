import { useEffect } from 'react'; 
import styles from './styles/app.scss';

import useAPIService  from './services/APIService';
import { RingLoader } from 'react-spinners'
import { theme } from './styles/theme';
const API_URL = process.env.REACT_APP_API_URL;


function App() {
  
  const {isLoading, error, data } = useAPIService({url: API_URL});
  useEffect(() => {
    console.log('useEffect', {isLoading, error, data})
  }, [isLoading, error, data])

  if (error) return (<>Error {JSON.stringify(error)}</>)

  return (
    <div className="App" styles={{...styles, ...theme}}>

      <header className="App-header">
        <RingLoader loading={isLoading} color={'#aaccff'} size={150} />

        <p>
          Edit <code>src/App.js</code> and save to reload.
          .{API_URL} { JSON.stringify(data) }.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
