import Router from "./services/Router";
import { ThemeProvider } from 'theme-ui'
import { theme } from './styles/theme'
import { Provider, rootStore } from "./store/RootStore";

import styles from './styles/app.scss';
import { useRef } from "react";


function App() {
  const currentRoute = useRef()

  return (
    <Provider value={rootStore}>
      <ThemeProvider theme={theme} styles={styles}>
        <Router {...currentRoute.current} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
