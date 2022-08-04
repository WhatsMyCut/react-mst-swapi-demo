import { useCallback, useEffect, useRef, useState } from 'react';
import { useMst } from '../../store/RootStore';
import { RingLoader } from 'react-spinners'
import { observer } from "mobx-react-lite";
import { Container, Grid } from 'theme-ui';
import './styles.scss';

export const Resident = observer((props) => {
  const [loading, setLoading] = useState(false);
  const { residents } = useMst();
  const { residentURL, displayBug } = props;

  const [allRes, setAllRes] = useState(undefined);

  // One to load data
  useEffect(() => {
    setLoading(true);
    residents.FetchResident(residentURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- leave empty so it only executes once.

  const renderResidents = useCallback(residentURL => {
    let content;
    if (!loading ) {
      console.log('renderResidents', allRes,)
      const aRes = residents && residents.findResidentByURL(residentURL);
      setAllRes(aRes)
      if (aRes.data){
        content = (
            <>{ aRes.data.name}</>
        )
      }
    } else {
      content = (<>Loading...</>)
    }
    // return data && data
    return (
      <>{ content }</>
    );
  }, [allRes, loading, residents]); // <-- leave blank so no rerenders occur


  // one to finish
  useEffect(() => {
    if (loading && residents && residents.findResidentByURL(residentURL) ) {
      setLoading(false);
      const data = (residents && 
        residents.status === 'done' && 
        residents.find)
        ? residents.findResidentByURL(residentURL) 
        : undefined;
      setAllRes(data);
      renderResidents();
    }
  
  }, [loading, renderResidents, residentURL, residents]) // <- this will monitor state 

  // useEffect(() => {
  // }, []);

  if (loading) return (<RingLoader loading={residents.status !== 'done'} color={'#000'} size={50} />);
  


  return (
    <>{ <Grid >
      { allRes }
    </Grid> }</>
  )
})

export default Resident