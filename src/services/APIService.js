import { useState, useEffect, useCallback } from 'react';

export const getData = async fullURL => {
  console.log('getData: ', fullURL)
  return await fetch(fullURL)
  .then((res) => res.json(), (rej) => console.error(rej))
  .then((result) => { 
    if (result ) {
      console.log('fetched: ', result)
      return JSON.stringify(result);
    }
    return;
  })
  .catch((err) => err)
};

export const useAPIService = (props) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const [data, setData] = useState({})
  
  const url = process.env.REACT_APP_API_URL;
  const { type = null, id = null} = props;
  const fullURL = url + (type ? type.toString() : '') + (id ? '/' + id.toString() : '' );
  console.log({fullURL})

  useEffect( props => {
    setLoading(true);
    setData(getData(fullURL)
      .then((res) => res.json())
      .catch(error => setError(error))
    );
    setLoading(false)
  }, [data, fullURL]);
  return useCallback(() => { return { isLoading, error, data }}, [data, error, isLoading]);
}

