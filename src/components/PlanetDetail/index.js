/** @jsxImportSource theme-ui */
import { useState, useEffect, useCallback } from 'react';
import { useMst } from '../../store/RootStore';
import { RingLoader } from 'react-spinners'
import Moment from 'moment';
import './styles.scss';
import { Container, Heading, Label, Text } from 'theme-ui';
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
} from 'react-ionicons'

export const PlanetDetail = (props) => {
  const { rowData } = props;
  const { planetdetails } = useMst();
  const [loading, setLoading] = useState(false);
  const [url, setURL] = useState(false);
   // One to load data
   useEffect(() => {
    setLoading(true);
    planetdetails.FetchDetails(rowData.url);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- leave empty so it only executes once.
  // one to finish
  useEffect(() => {
    if (loading && !!planetdetails.planetDetails) {
      setLoading(false);
    }
  }, [planetdetails.planetDetails, loading]) // <- this will monitor state 

  const renderPlanetDetails = useCallback(() => {
      if (!!planetdetails.planetDetails) {
        const details = JSON.parse(planetdetails.planetDetails);
        const createdDate = Moment(details.created).format('d MMM');
        const editedDate = Moment(details.edited).format('d MMM');
        return (
          <div className={'detail-container'}>
            <Heading className='detail-header' variant='h1'>{details.name}</Heading>
            <div className='detail-subcontainer'>
              <div className={'detail-row right'}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'stretch'
                }}>
                <div><EarthOutline sx={{ margin: '0 10px'}}/> Rotation Period</div>
                <div>{details.rotation_period}</div>
              </div>
              <div className={'detail-row right'}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',

                }}>
                <div><PlanetOutline  sx={{ margin: '0 10px'}}/> Orbital Period</div>
                <div>{details.orbital_period}</div>
              </div>
              <div className='detail-row right'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',

                }}>
                <div><InvertModeOutline  sx={{ margin: '0 10px'}}/> Diameter</div>
                <div>{details.diameter}</div>
              </div>
              <div className='detail-row'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',

                }}>
                <div><CloudyNightOutline  sx={{ margin: '0 10px'}}/> Climate</div>
                <div>{details.climate}</div>
              </div>
              <div className='detail-row'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',

                }}>
                <Text><BarbellOutline  sx={{ margin: '0 10px'}}/> Gravity</Text>
                <Text>{details.gravity}</Text>
              </div>
              <div className='detail-row'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',

                }}>
                <Text><ImageOutline  sx={{ margin: '0 10px'}}/> Terrain</Text>
                <Text>{details.terrain}</Text>
              </div>
              <div className='detail-row'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',

                }}>
                <Text><WaterOutline  sx={{ margin: '0 10px'}}/> Surface Water</Text>
                <Text>{details.surface_water}</Text>
              </div>
              <div className='detail-row'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',

                }}>
                <Text><PeopleOutline  sx={{ margin: '0 10px'}}/> Population</Text>
                <Text>{details.population}</Text>
              </div>
              <div className='detail-row'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',

                }}>
                <Text><CalendarOutline  sx={{ margin: '0 10px'}}/> Created</Text>
                <Text>{createdDate}</Text>
              </div>
              <div className='detail-row'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',

                }}>
                <Text><PencilOutline sx={{ margin: '0 10px'}}/> Edited</Text>
                <Text>{editedDate}</Text>
              </div>
              <div className='detail-row'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Text><BrowsersOutline /> URL</Text>
                <Text>{details.url}</Text>
              </div>

            {/* {
              Object.entries(details).map((v, i) => {
                const content = (typeof(v[1]) === 'array') ? Object.values(v[1]).map((u, j) => <><Text key={j}>{u}</Text><br/></>) : <Text>{v[1]}</Text>
                
                return (
                    <Container key={i} className={'detail-row'}>
                      <Label>{v[0]}</Label> { content }
                    </Container>
                )
              })              
            } */}
            </div>
          </div>
        )

 
      }
  }, [])

  
  useEffect(() => {
    if (rowData.url !== url) setURL(rowData.url)
    setLoading(planetdetails.status === "loading")
  }, [planetdetails, rowData, url])
  
  const details = renderPlanetDetails()
  return (
    <Container className={'detail-panel'}>
      <RingLoader loading={loading} color={'#000'} size={150} />
      { details }
    </Container>
  )
}

export default PlanetDetail;
