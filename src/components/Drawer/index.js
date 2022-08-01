import { useEffect, useRef } from 'react';
import { Container, IconButton, Text } from 'theme-ui'
import { CloseCircleOutline } from 'react-ionicons';
import './styles.scss'

export const Drawer = (props) => {
  const { handleClose, isOpen } = props
  const className = useRef();
  useEffect(() => {
    className.current = 'drawer' + isOpen ? ' open' : ' closed';
  }, [isOpen])
  return (
    <Container sx={{ transition: '1s width' }} className={className.current}>
     <IconButton aria-label="Close Drawer" onClick={handleClose}><CloseCircleOutline color={'#00000'}
      height="25px"
      width="25px" sx={{marginTop: '5px'}}/></IconButton>
      <Text>Drawer</Text>
      {props.children}
    </Container>
  )
}

export default Drawer