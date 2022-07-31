import { types, flow } from 'mobx-state-tree';
import { getData } from '../../services/APIService';

const Category = types
  .model({
    name: types.optional(types.string, ''),
    url: types.optional(types.string, ''),
  })
  .views((self) => {
    return {
      get allCategories() {
        console.log('Category.allCategories', self.categories);
        return self.categories;
      },
      findCategoryByName(name) {
        return self.categories.filter((t) => t.name === name);
      },
      getState() {
        return self.state;
      }
    };
  })
  .actions((self) => {
    const FetchAll = flow( function* () {// <- note the star, this is a generator function!
      
      self.state = 'loading';
      try {
        // ... yield can be used in async/await style
        
        self.categories = yield getData(process.env.REACT_APP_API_URL + "");
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

export default Category;
