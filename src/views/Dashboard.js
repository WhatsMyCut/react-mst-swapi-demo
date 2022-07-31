import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import { RingLoader } from 'react-spinners'
import { observer } from "mobx-react-lite";
import { useMst } from '../store/RootStore';
import { Container, Text, Heading, Card, NavLink } from 'theme-ui';

export const Dashboard = observer((props) => {
  const { categories } = useMst();
  const [loading, setLoading] = useState(false);

  // One to load data
  useEffect(() => {
    setLoading(true);
    categories.FetchAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- leave empty so it only executes once.

  // one to finish
  useEffect(() => {
    if (loading && categories.allCategories && categories.allCategories.length) {
      setLoading(false);
    }
  }, [categories.allCategories, loading]) // <- this will monitor state 


  const CategoryPanel = useCallback(props => {
    console.log('CategoryPanel', {props})
    return (
      <div>
        <Text>{props.category}</Text>
        <Text>{props.url}</Text>
      </div>
    )
  }, []);

  const renderCategoryPanels = useCallback(data => {
    if (!!data) {
      console.log('renderCategoryPanels', JSON.parse(data))
      return (
        Object.entries(JSON.parse(data)).map((v, i) => {
          return (<CategoryPanel category={v[0]} url={v[1]} key={i}/>)
        })
      )
    }
  }, [])

  if (loading) return "loading..."

  const panels = renderCategoryPanels(categories.allCategories)
  
  return (
    <div className="App" styles={[{...props.styles, ...props.theme}]}>

        <RingLoader loading={loading} color={'#000'} size={150} />
        <Link to={'/planets'}>Planet List</Link>
      <header className="App-header">
        <div>
          Edit <code>src/App.js</code> and save to reload.
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
      <Container >
        <Heading variant={'h1'}>H1</Heading>
        <Text>The text</Text>
        <div>
        { panels }
        </div>
      </Container>
    </div>
  )
});

export default Dashboard;