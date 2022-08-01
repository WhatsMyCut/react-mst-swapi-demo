/** @jsxImportSource theme-ui */
import { useCallback, useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container, Text, Heading, Card, NavLink } from 'theme-ui';
import { Breadcrumb, FlexboxSidebar, PlanetsTable } from '../components';
import Sidebar from "../components/Sidebar";
import Drawer from '../components/Drawer';

export const Dashboard = observer((props) => {
  const currentRow = useRef(undefined);
  const currentCategory = useRef(undefined);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState();

  const handleClose = useCallback(() => {
    console.log('handleClose', drawerOpen, currentRow.current)
    currentRow.current = undefined;
    setDrawerOpen(false);
  }, [])

  const setCurrentRow = useCallback(rowData => {
    currentRow.current = rowData;
    if (rowData.url) {
      
      console.log('setCurrentRow', {rowData})
      if (String(rowData.url).indexOf('planets') !== -1) {
        setDrawerContent('planet panel')
      } else if (String(rowData.url).indexOf('category') !== -1){
        setDrawerContent('category panel');
      }
      setDrawerOpen(true);
    }
  }, [])

  const setCurrentCategory = useCallback(e => {
    e.preventDefault();
    const { currentTarget } = e;
    currentCategory.current = currentTarget.href;
    // console.log('setCurrentCategory', currentCategory.current.href, {currentTarget})
  }, [])
  

  useEffect(() => {
  }, [])

  return (
    <FlexboxSidebar sidebar={<Sidebar {...props} setCurrentCategory={setCurrentCategory} />}>
      <Drawer handleClose={handleClose} isOpen={drawerOpen} ><Text>{drawerContent}</Text></Drawer>
      <Container className="App" styles={[{...props.styles, ...props.theme}]}>

        <header className="App-header">
          <Breadcrumb />
        </header>
        <Container >
          <PlanetsTable setCurrentRow={setCurrentRow} currentRow={currentRow.current} />
        </Container>
      </Container>
    </FlexboxSidebar>
  )
});

export default Dashboard;