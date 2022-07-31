import { types, flow } from "mobx-state-tree";
import { getData } from '../../services/APIService';

const Planet = types.model({
  name: types.optional(types.string, ""),
}).views(self => {
return {
  get allPlanets() {
    return self.planets
  },
  findPlanetByName(name) {
      return self.planets.filter(t => t.name === name)
  }
}
}).actions(self => {

  const FetchAll = flow( function* () {// <- note the star, this is a generator function!
      
    self.state = 'loading';
    try {
      // ... yield can be used in async/await style
      
      self.categories = yield getData(process.env.REACT_APP_API_URL + "planets");
      self.state = 'done';
    } catch (error) { // this catches the try
      self.state = 'error'
    }
    
    // The action will return a promise that resolves to the returned value
    // (or rejects with anything thrown from the action)

    return self.categories.length;
  });
  return {
    FetchAll,
  };
});

export default Planet;