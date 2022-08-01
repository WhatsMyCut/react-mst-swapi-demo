/** @jsxImportSource theme-ui */
import { useCallback, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container, Text, Heading, Card, NavLink } from 'theme-ui';
import { Breadcrumb, FlexboxSidebar, PlanetsTable } from '../components';
import Sidebar from "../components/Sidebar";
import Drawer from '../components/Drawer';

export const Dashboard = observer((props) => {
  const currentRow = useRef({});
  const currentCategory = useRef({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpen = useCallback(() => {
    console.log('handleopen')
    setDrawerOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    console.log('handleClose')
    setDrawerOpen(false)
  }, [])

  const setCurrentRow = useCallback(e => {
    e.preventDefault();
    const { currentTarget } = e;
    currentRow.current = currentTarget.id;
    console.log('setCurrentRow', currentRow.current, {currentTarget})
    handleOpen()
  }, [handleOpen])

  const setCurrentCategory = useCallback(e => {
    e.preventDefault();
    const { currentTarget } = e;
    currentCategory.current = currentTarget.href;
    console.log('setCurrentCategory', currentCategory.current.href, {currentTarget})
  }, [])

  return (
    <FlexboxSidebar sidebar={<Sidebar {...props} setCurrentCategory={setCurrentCategory} />}>
      <Drawer handleClose={handleClose} isOpen={drawerOpen} ><Text>Drawer child</Text></Drawer>
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