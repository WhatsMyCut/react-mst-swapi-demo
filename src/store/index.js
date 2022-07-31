import { createContext, useContext } from 'react'
import { ConfigStore } from './ConfigStore'
import { Observer } from 'mobx-react';

export const ConfigContext = createContext(null);

export const StoreProvider = () => {
  const store = (() => ({
    theme: null,
    language: 'en'
  }));

  return (
    <Observer><StoreProvider.Provider value={{store}}></StoreProvider.Provider></Observer>
  )
};
export const useStore = () => useContext(ConfigContext)