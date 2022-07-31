import { useState, useEffect } from 'react';
import { types, flow } from 'mobx-state-tree';
import { getData, useAPIService } from '../../services/APIService';

const Category = types
  .model({
    name: types.optional(types.string, ''),
    url: types.optional(types.string, ''),
  })
  .views((self) => {
    return {
      get allCategories() {
        return self.categories;
      },
      findCategoryByName(name) {
        return self.categories.filter((t) => t.name === name);
      },
    };
  })
  .actions((self) => {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(undefined)
    const [payload, setPayload] = useState({})
    const Preload = () => {
      const { isLoading, error, data } = useAPIService({});
      useEffect(() => {
        if (isLoading !== loading) setLoading(isLoading);
        if (error !== err) setErr(error);
        if (data !== payload) setPayload(data);
      }, [data, error, isLoading])
    }
    const FetchAll = flow( function* () {// <- note the star, this is a generator function!
      
      self.state = loading;
      try {
        // ... yield can be used in async/await style
        self.categories = yield getData(process.env.REACT_APP_API_URL + "");
        self.state = loading;
      } catch (error) { // this catches the try
        self.state = error
      }
      if (err) { // this catches the hook
        self.state = err
      }
      
      // The action will return a promise that resolves to the returned value
      // (or rejects with anything thrown from the action)
      console.log('Category.FetchAll', self.categories);

      return self.categories;
    });
    return {
      Preload,
      FetchAll,
    };
  });

export default Category;
