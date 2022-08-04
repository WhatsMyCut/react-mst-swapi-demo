/** @jsxImportSource theme-ui */
import { useCallback, useRef, useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Container } from 'theme-ui';
import { Breadcrumb, FlexboxSidebar, PlanetsTable } from '../components';
import Sidebar from "../components/Sidebar";
import Drawer from '../components/Drawer';
import PlanetDetail from '../components/PlanetDetail';

export const Dashboard = observer((props) => {
  const [currentRow, setRow] = useState(undefined);
  const [currentCategory, setCategory] = useState('planets');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState();
  const drawer = useRef();

  const handleClose = useCallback(() => {
    setRow(undefined);
    setDrawerOpen(false);
  }, [])

  const setCurrentRow = useCallback(rowData => {
    if (!!rowData) {
      setRow(rowData);
    }
    if (rowData.url) {
      
      if (String(rowData.url).indexOf('planets') !== -1) {
        drawer.current = <PlanetDetail rowData={rowData} />
        setDrawerContent(drawer.current)
      } else if (String(rowData.url).indexOf('category') !== -1){
        setDrawerContent('category panel');
      }
      setDrawerOpen(true);
    }
  }, [])

  const setCurrentCategory = useCallback(e => {
    e.preventDefault();
    const { currentTarget } = e;
    setCategory(String(currentTarget.href).replace(process.env.REACT_APP_HOSTNAME, ''));
  }, [])
  

  useEffect(() => {
  }, [])
  
  drawer.current = (drawerContent);

  const table = (<PlanetsTable setCurrentRow={setCurrentRow} currentRow={currentRow} />)
  const breadcrumb = (<Breadcrumb currentCategory={currentCategory} currentRow={currentRow} />)
  return (
    <FlexboxSidebar sidebar={<Sidebar {...props} setCurrentCategory={setCurrentCategory} />}>
      <Drawer handleClose={handleClose} isOpen={drawerOpen} >{drawer.current}</Drawer>
      <Container className="App" styles={[{...props.styles, ...props.theme}]}>

        <header className="App-header">
          { breadcrumb }
        </header>
        <Container >
          { table }
        </Container>
      </Container>
    </FlexboxSidebar>
  )
});

export default Dashboard;