import { types, flow } from "mobx-state-tree";
import { useAPIService } from "../../services/APIService";

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

  const fetchAll = flow(function() {// <- note the star, this is a generator function & yield
    const { isLoading, data, error } = useAPIService({type: ''});
    
    self.state = isLoading
    if (!!data) {
      console.warn("Planet.fetchAll", {data})
      self.planets = data;
      self.state = isLoading;
    }
    if (!!error) {
      self.state = error
    }
    
    // The action will return a promise that resolves to the returned value
    // (or rejects with anything thrown from the action)
    return self.planets;
  })
  return {
    fetchAll
  }
});

export default Planet;