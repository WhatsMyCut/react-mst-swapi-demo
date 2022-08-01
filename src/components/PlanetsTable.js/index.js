import { useEffect, useState, useCallback } from 'react';
import { useMst } from '../../store/RootStore';
import { RingLoader } from 'react-spinners'
import { observer } from "mobx-react-lite";
import { Container, Text, NavLink, Button, Heading } from 'theme-ui';
import TableView from '../TableView';
import './styles.scss'
import { FilterInput } from '../FilterInput';
import { tab } from '@testing-library/user-event/dist/tab';
export const PlanetsTable = observer((props) => {
  // console.log('Sidebar', {props})

  const { planets } = useMst();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const { setCurrentRow, currentRow } = props;

  const setDrawerData = useCallback((e) => {
    e.preventDefault();
    const rowId = e.currentTarget.id;
    console.log('setDrawerData', {rowId}, {filteredData})
    return setCurrentRow(filteredData[rowId])
  }, [setCurrentRow, filteredData]);

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

  const PlanetPanel = useCallback(props => {
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
      const display = filteredData.length

      return (
        <Container sx={{margin: '5px'}}>
        {!!previous && 
          <Button htmlFor={previous}  title={'Prev'}>Prev</Button>
        }
        <Text sx={{ padding: '15px'}}>Displaying {display || 0} of { count } records</Text>
        {!!next && 
          <Button htmlFor={next} title={'Next'} >Next</Button>
        }
        </Container>
      )
    }
  }, [])

  const renderTable = useCallback(tableData => {
    if (!tableData) return;
    const displayFields = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain', 'surface_water', 'population']
    return <TableView data={filteredData} displayFields={displayFields} setCurrentRow={setDrawerData} selectedRow={currentRow} />
  }, [filteredData, currentRow, setDrawerData])

  
  const pagination = renderPagination(planets.allPlanets);
  const table = renderTable(planets.allPlanets);

  const handleFilter = useCallback((e) => {
    e.preventDefault();
    const { target } = e;
    if (!!target.value && target.value !== '') {
      const filteredData = Object.values(JSON.parse(planets.allPlanets).results).filter((v) => String(v.name).toLocaleLowerCase().indexOf(String(target.value).toLocaleLowerCase()) !== -1)
      console.log('handleFilter', target.value, {filteredData} )
      setFilteredData(filteredData)
    } else {
      setFilteredData(JSON.parse(planets.allPlanets).results);
    }
  }, [])
  
  useEffect(() => {
    setFilteredData(tableData.results);
    renderTable()
  },[])


  return (
    <Container sx={{backgroundColor: 'transparent', borderWidth: 2,}}>
    <Container>
      <Heading variant={'h1'}>Planet List</Heading>
      <FilterInput handleFilter={handleFilter}/>
    </Container>
    {planets.status !== 'done' &&
      <RingLoader loading={planets.status !== 'done'} color={'#000'} size={50} />
    }
    {planets.status === 'done'  && 
      <Container>{table}</Container>
    }
    <Container>{pagination}</Container>
    </Container>
  )
});

export default PlanetsTable;
