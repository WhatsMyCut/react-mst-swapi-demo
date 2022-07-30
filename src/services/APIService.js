import { useState, useEffect, useCallback } from 'react';

export const useAPIService = (props) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const [data, setData] = useState({})
  
  const { url, type =  null, id = null} = props;
  const fullURL = url + (type ? type.toString() : '') + (id ? '/' + id.toString() : '' );
  
  useEffect( props => {
    const getData = () => fetch(fullURL)
    .then((res) => res.json())
    .then((result) => { setData(result); return result})
    .catch((err) => { setError(err) })
    .finally(() => setLoading(false) );

    setLoading(true);
    getData()
    console.log('fetched: ', JSON.stringify(data))
  }, [data, fullURL]);
  return useCallback(() => { return { isLoading, error, data }}, [data, error, isLoading]);
}

export default useAPIService;
