import { types, flow } from "mobx-state-tree";
import { getData } from '../../services/APIService';


const Planet = types.model({
  count: types.optional(types.string, ""),
  next: types.optional(types.string, ""),
  previous: types.optional(types.string, ""),
  // itemList : types.optional(types.array(types.Result, []))
}).views(self => {
return {
  get allPlanets() {
    return self.planets
  },
  findPlanetByName(name) {
      return self.planets.filter(t => t.name === name)
  },
  get status() {
    return self.state
  }
}
}).actions(self => {

  const fetchPage = flow(function* (url) {
    return yield getData(url);
  })

  const FetchAll = flow( function* () {// <- note the star, this is a generator function!
      
    self.state = 'loading';
    try {
      let allRows = [];
      // get first page
      const first = yield fetchPage(process.env.REACT_APP_API_URL + "planets");
      let json = JSON.parse(first);
      allRows = [...allRows, ...json.results];
      while (json.next) {
        const nextPage = yield fetchPage(json.next);
        const newResults = JSON.parse(nextPage);
        allRows = [...allRows, ...newResults.results];
        json = JSON.parse(nextPage);
      }
      json.results = allRows;
      self.planets = JSON.stringify(json);     
      // additional pages and add additions results to the results
      // ... yield can be used in async/await style
      self.state = 'done';
    } catch (error) { // this catches the try
      self.state = 'error'
    }
    
    // The action will return a promise that resolves to the returned value
    // (or rejects with anything thrown from the action)

    return self.planets.length;
  });
  return {
    FetchAll,
  };
});

export default Planet;