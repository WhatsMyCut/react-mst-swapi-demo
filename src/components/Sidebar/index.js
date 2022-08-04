import { useEffect, useState, useCallback } from 'react';
import { useMst } from '../../store/RootStore';
import { RingLoader } from 'react-spinners'
import { observer } from "mobx-react-lite";
import { Container, Image, NavLink } from 'theme-ui';

export const Sidebar = observer((props) => {
  // console.log('Sidebar', {props})

  const { categories } = useMst();
  const [loading, setLoading] = useState(false);
  const { setCurrentCategory } = props;
  // One to load data
  useEffect(() => {
    setLoading(true);
    categories.FetchAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- leave empty so it only executes once.

  // one to finish
  useEffect(() => {
    const cats = categories.allCategories && categories.allCategories.length
    if (loading && cats) {
      setLoading(false);
    }
  }, [categories.allCategories, loading]) // <- this will monitor state 


  const CategoryPanel = useCallback(props => {
    // Adds aria-labels and capitalization using an old-school method.
    return (
      <Container sx={{ marginTop: '5px', backgroundColor: '#efefef', borderWidth: 2, borderColor: '#999', borderRadius: 5, }}>
        <NavLink href={props.category} id={props.id} p={2} aria-label={`Navigate to the ${props.category} category.`} onClick={setCurrentCategory}>
        { String(props.category)[0].toLocaleUpperCase() + String(props.category).slice(1) }  
        </NavLink>
      </Container>
    )
  }, [setCurrentCategory]);

  const renderCategoryPanels = useCallback(data => {
    if (!!data) {
      return (
        Object.entries(JSON.parse(data)).map((v, i) => {
          return (<CategoryPanel category={v[0]} url={v[1]} key={i} id={i} {...props}/>)
        })
      )
    }
  }, [props])

  const panels = renderCategoryPanels(categories.allCategories)

  return (
    <Container>
    <Image src={process.env.PUBLIC_URL + "/star-wars-logo.jpg"} width={150} styles={{ maxWidth: '100px' }} />
    <RingLoader loading={loading} color={'#000'} size={150} />
    { panels }
    </Container>
  )
});

export default Sidebar;
