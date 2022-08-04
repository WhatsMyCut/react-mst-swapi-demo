import { useEffect, useState } from 'react';
import { useMst } from '../../store/RootStore';
import { RingLoader } from 'react-spinners'
import { observer } from "mobx-react-lite";
import { Container } from 'theme-ui';
import './styles.scss';

export const Resident = observer((props) => {
  const [loading, setLoading] = useState(false);
  const { residents } = useMst();
  const { residentURL } = props;

  // One to load data
  useEffect(() => {
    setLoading(true);
    residents.FetchResident(residentURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- leave empty so it only executes once.

  // one to finish
  useEffect(() => {
    if (loading && residents && residents.status !== 'loading') {
      console.log('FetchResident', JSON.stringify(residents))
      setLoading(false);
    }
  }, [loading, residents, residentURL]) // <- this will monitor state 

  const content = (residents.status !== 'done') ? 
  (<RingLoader loading={residents.status !== 'done'} color={'#000'} size={50} />) 
    : 
  (
    <>
      <Container>{residents.findResidentByURL(residentURL) }</Container>
    </>
  )

  return (
    <>{ content }</>
  )
})

export default Resident