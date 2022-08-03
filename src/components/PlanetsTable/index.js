import { useEffect, useState, useCallback, useRef } from 'react';
import { useMst } from '../../store/RootStore';
import { RingLoader } from 'react-spinners'
import { observer } from "mobx-react-lite";
import { Container, Text, Button, Heading } from 'theme-ui';
import TableView from '../TableView';
import './styles.scss'
import { FilterInput } from '../FilterInput';
export const PlanetsTable = observer((props) => {
  // console.log('PlanetsTable', {props})

  const { planets } = useMst();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const { setCurrentRow, currentRow } = props;
  const filterRef = useRef();


  const getFilteredData = useCallback(() => {
    const value = filterRef.current.value;
    const data = JSON.parse(planets.allPlanets).results;
    return Object.values(data).filter((v) => String(v.name).toLocaleLowerCase().indexOf(String(value).toLocaleLowerCase()) !== -1);
  }, [planets.allPlanets]);

  const handleFilter = useCallback(() => {
    const value = filterRef.current.value;
    if (!!value) {
      return setFilteredData(getFilteredData(value))
    } 
    setFilteredData(tableData.results);
  }, [getFilteredData, tableData.results])
  

  const setDrawerData = useCallback((e) => {
    e.preventDefault();
    const rowId = e.currentTarget.id;
    setCurrentRow(filteredData[rowId])
  }, [setCurrentRow, filteredData]);

  // One to load data
  useEffect(() => {
    setLoading(true);
    planets.FetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- leave empty so it only executes once.

  const renderPagination = useCallback(() => {
    if (!!tableData) {
      const json = tableData;
      const { next, previous, count } = json;
      const display = (filteredData && filteredData.length) || 0;

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
  }, [filteredData, tableData])

  const renderTable = useCallback(() => {
      const filtered = getFilteredData();
      const displayFields = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain', 'surface_water', 'population']
      return <TableView data={filtered} displayFields={displayFields} setCurrentRow={setDrawerData} selectedRow={currentRow} />
  }, [getFilteredData, setDrawerData, currentRow]);

  // one to finish
  useEffect(() => {
    if (planets && planets.status === 'done') {
      setLoading(false);
      var data = JSON.parse(planets.allPlanets);
      setTableData(data);
      setFilteredData(data.results)
    }
  }, [planets, loading, getFilteredData]) // <- this will monitor state 

  const content = (planets.status !== 'done') ? 
  (<RingLoader loading={planets.status !== 'done'} color={'#000'} size={50} />) 
    : 
  (
    <>
      <Container>{renderTable()}</Container>
      <Container>{renderPagination()}</Container>
    </>
  )


  return (
    <Container sx={{backgroundColor: 'transparent', borderWidth: 2,}}>
      <Container>
        <Heading variant={'h1'}>Planet List</Heading>
        <FilterInput inputRef={filterRef} handleFilter={handleFilter}/>
      </Container>
      { content }
      
    </Container>
  )
});

export default PlanetsTable;
