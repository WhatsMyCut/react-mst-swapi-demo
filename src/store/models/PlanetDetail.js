import { types, flow } from "mobx-state-tree";
import Moment from 'moment';
import '../../components/PlanetDetail/styles.scss';

import { Heading, Text } from 'theme-ui';
import { getData } from '../../services/APIService';
import { 
  PlanetOutline, 
  EarthOutline, 
  InvertModeOutline, 
  CloudyNightOutline, 
  BarbellOutline, 
  ImageOutline,
  WaterOutline,
  PeopleOutline,
  CalendarOutline,
  PencilOutline,
  BrowsersOutline
} from 'react-ionicons';

const PlanetDetail = types.model({
  climate: types.optional(types.string, ""),
  // created: types.optional(types.Date, "2014-12-20T20:58:18.411000Z"),
  diameter: types.optional(types.number, 0),
  // edited: types.optional(types.Date, "2014-12-20T20:58:18.411000Z"),
  // films: types.optional(types.array(types.string, [])),
  gravity: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
  orbital_period: types.optional(types.number, 0),
  population: types.optional(types.number, 0),
  // residents: types.optional(types.array(types.string, [])),
  rotation_period: types.optional(types.number, 0),
  surface_water: types.optional(types.number, 0),
  terrain: types.optional(types.string, ""),
  url: types.optional(types.string, ""),
}).views(self => {
return {
    get planetDetails() {
      console.log('PlanetDetail.planetDetails', self.planetdetails)
      return self.planetdetails
    },
    findPlanetDetailByName(name) {
        return self.planetdetails.filter(t => t.name === name)
    },
    get status() {
      console.log('PlanetDetail.status', self.state)
      return self.state
    }
  }
}).actions(self => {

  const FetchDetails = flow( function* (url) {// <- note the star, this is a generator function!
    // console.log('FetchDetails', url)
    self.planetdetails = undefined;
    self.state = 'loading';
    try {
      // ... yield can be used in async/await style
      
      self.planetdetails = yield getData(url);
      self.state = 'done';
      console.log('FetchDetails.fetched', url);
    } catch (error) { // this catches the try
      self.state = 'error'
    }
    
    // The action will return a promise that resolves to the returned value
    // (or rejects with anything thrown from the action)

    return self.planetdetails.length;
  });
  return {
    FetchDetails,
  };
});

export default PlanetDetail;