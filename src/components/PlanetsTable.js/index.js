import { useEffect, useState, useCallback } from 'react';
import { useMst } from '../../store/RootStore';
import { RingLoader } from 'react-spinners'
import { observer } from "mobx-react-lite";
import { Container, Text, NavLink, Button } from 'theme-ui';
import TableView from '../TableView';

export const PlanetsTable = observer((props) => {
  // console.log('Sidebar', {props})

  const { planets } = useMst();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({});

  // One to load data
  useEffect(() => {
    setLoading(true);
    planets.FetchAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- leave empty so it only executes once.

  // one to finish
  useEffect(() => {
    if (loading && planets && planets.allPlanets) {
      setLoading(false);
      setTableData(JSON.parse(planets.allPlanets))
    }
  }, [planets, loading]) // <- this will monitor state 


  const CategoryPanel = useCallback(props => {
    // Adds aria-labels and capitalization using an old-school method.
    return (
      <Container sx={{ marginTop: '5px', backgroundColor: '#efefef', borderWidth: 2, borderColor: '#999', borderRadius: 5, }}>
        <NavLink href={props.category} p={2} aria-label={`Navigate to the ${props.category} category.`}>
        { String(props.category)[0].toLocaleUpperCase() + String(props.category).slice(1) }  
        </NavLink>
      </Container>
    )
  }, []);

  const renderPagination = useCallback(tableData => {
    if (!!tableData) {
      const json = JSON.parse(tableData);
      const { next, previous, count } = json;

      return (
        <>
        {next && 
          <Button htmlFor={next} />
        }
        <Text>Displaying { count } records</Text>
        {previous && 
          <Button htmlFor={previous} />
        }
        </>
      )
    }
  }, [])

  const renderTable = useCallback(tableData => {
    if (!tableData) return;
    const displayFields = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain', 'surface_water', 'population']
    return <TableView data={ JSON.parse(tableData).results} displayFields={displayFields} />
  }, [])

  const pagination = renderPagination(planets.allPlanets);
  const table = renderTable(planets.allPlanets);

  return (
    <Container sx={{backgroundColor: 'transparent', borderWidth: 2,}}>
    <RingLoader loading={planets.status !== 'done'} color={'#000'} size={50} />
    <Container>{table}</Container>
    <Container>{pagination}</Container>
    </Container>
  )
});

export default PlanetsTable;
