/** @jsxImportSource theme-ui */
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container, Text, Heading, Card, NavLink } from 'theme-ui';
import { FlexboxSidebar, PlanetsTable } from '../components';
import Sidebar from "../components/Sidebar";

export const Dashboard = observer((props) => {

  return (
    <FlexboxSidebar sidebar={<Sidebar {...props} />}>
    <div className="App" styles={[{...props.styles, ...props.theme}]}>

      <header className="App-header">
        <div>
          Edit <code>src/App.js</code> and save to reload.
        </div>
      </header>
      <Container >
        <Link to={'/planets'}>Planet List</Link>
        <Heading variant={'h1'}>H1</Heading>
        <Text>The text</Text>
        <PlanetsTable />
      </Container>
    </div>
    </FlexboxSidebar>
  )
});

export default Dashboard;