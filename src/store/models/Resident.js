import { types, flow } from "mobx-state-tree";
import { getData } from '../../services/APIService';

const Resident = types.model({
  name: types.optional(types.string, ""),
  height: types.optional(types.number, 0),
  mass: types.optional(types.number, 0),
  hair_color: types.optional(types.string, ""),
  skin_color: types.optional(types.string, ""),
  eye_color: types.optional(types.string, ""),
  birth_year: types.optional(types.string, ""),
  gender: types.optional(types.string, ""),
  homeworld: types.optional(types.string, ""),
  // films: types.optional(types.array(types.string, [])),
  // species: types.optional(types.array(types.string, [])),
  // vehicles: types.optional(types.array(types.string, [])),
  // starships: types.optional(types.array(types.string, [])),
  // created: types.optional(types.Date, "2014-12-20T20:58:18.411000Z"),
  // edited: types.optional(types.Date, "2014-12-20T20:58:18.411000Z"),
  url: types.optional(types.string, ""),
}).views(self => {
return {
    get residentDetails() {
      return self.residents
    },
    findResidentByURL(url) {
      console.log('Resident.findResidentByURL', self.residents)
      return self.residents[url];
    },
    get status() {
      return self.state
    }
  }
}).actions(self => {

  const FetchResident = flow( function* (url) {// <- note the star, this is a generator function!
    // console.log('FetchResident', url)
    self.residents = [];
    self.state = 'loading';
    try {
      // ... yield can be used in async/await style
      const y = yield getData(url);
      console.log('Resident.findResidentByURL')
      self.residents[url] = y;
      self.state = 'done';
    } catch (error) { // this catches the try
      self.state = 'error'
    }

    // The action will return a promise that resolves to the returned value
    // (or rejects with anything thrown from the action)
    return self.residents.length;
  });
  return {
    FetchResident,
  };
});

export default Resident;