import { onSnapshot, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { Category, Planet } from "./models/";

const RootStore = types.model({
  categories: Category,
  planets: Planet
})

let initialState = RootStore.create({
  planets: {},
  categories: {},
})

// if (process.browser) {
//   const data = localStorage.getItem("rootState");
//   if (data) {
//     const json = JSON.parse(data);
//     if (RootModel.is(json)) {
//       initialState = RootModel.create(json);
//     }
//   }
// }

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
  localStorage.setItem("rootState", JSON.stringify(snapshot));
});

const RootStoreContext = createContext(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}