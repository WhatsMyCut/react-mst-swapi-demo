import { useState, useEffect, useCallback } from 'react';

export const useAPIService = (props) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const [data, setData] = useState({})
  
  const { url, type =  null, id = null} = props;
  const fullURL = url + (type ? type.toString() : '') + (id ? '/' + id.toString() : '' );
  
  const getData = useCallback(() => {
    setLoading(true)
    return fetch(fullURL)
    .then((res) => res.json())
    .then((result) => { 
      if (data === result) setData(result);
      // console.log('fetched: ', data, result)
      return result;
    })
    .catch((err) => { setError(err) })
    .finally(() => setLoading(false));
  }, [data, fullURL]);

  useEffect( props => {
    setLoading(true);
    getData()
  }, [data, fullURL, getData]);
  return useCallback(() => { return { isLoading, error, data }}, [data, error, isLoading]);
}

export default useAPIService;
