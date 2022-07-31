import { useEffect, useRef, useCallback } from 'react';
import { Link } from "react-router-dom";
import { RingLoader } from 'react-spinners'
import { observer } from "mobx-react-lite";
import { useMst } from '../store/RootStore';

export const Dashboard = observer((props) => {
  const { categories } = useMst();

  let allCats = useRef();
  
  useEffect(() => {
    console.log('useEffect', allCats.current)
  }, [categories])


  return (
    <div className="App" styles={[{...props.styles, ...props.theme}]}>

      <header className="App-header">
        <RingLoader loading={true} color={'#aaccff'} size={150} />
        <Link to={'/planets'}>Planet List</Link>
        <div>
          Edit <code>src/App.js</code> and save to reload.
          .{ allCats.current && JSON.stringify(allCats.current) }
        </div>
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
  )
});

export default Dashboard;