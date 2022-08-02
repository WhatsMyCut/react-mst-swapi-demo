/** @jsxImportSource theme-ui */
import { useCallback, useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container, Text, Heading, Card, NavLink } from 'theme-ui';
import { Breadcrumb, FlexboxSidebar, PlanetsTable } from '../components';
import Sidebar from "../components/Sidebar";
import Drawer from '../components/Drawer';
import PlanetDetail from '../components/PlanetDetail';

export const Dashboard = observer((props) => {
  const [currentRow, setRow] = useState(undefined);
  const [currentCategory, setCategory] = useState('planets');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState();

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
        setDrawerContent(<PlanetDetail rowData={rowData} />)
      } else if (String(rowData.url).indexOf('category') !== -1){
        setDrawerContent('category panel');
      }
      setDrawerOpen(true);
    }
  }, [currentRow])

  const setCurrentCategory = useCallback(e => {
    e.preventDefault();
    const { currentTarget } = e;
    setCategory(String(currentTarget.href).replace(process.env.REACT_APP_HOSTNAME, ''));
  }, [])
  

  useEffect(() => {
  }, [])
  const drawer = (drawerContent)

  const table = (<PlanetsTable setCurrentRow={setCurrentRow} currentRow={currentRow} />)
  const breadcrumb = (<Breadcrumb currentCategory={currentCategory} currentRow={currentRow} />)
  return (
    <FlexboxSidebar sidebar={<Sidebar {...props} setCurrentCategory={setCurrentCategory} />}>
      <Drawer handleClose={handleClose} isOpen={drawerOpen} >{drawer}</Drawer>
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