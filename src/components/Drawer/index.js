import { useEffect, useRef, useState } from 'react';
import { Container, IconButton, Text } from 'theme-ui'
import { CloseCircleOutline } from 'react-ionicons';
import './styles.scss'

export const Drawer = (props) => {
  const { handleClose, isOpen, drawerURL } = props
  const cname = useRef('drawer');
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(isOpen)
  
  // handle open/close state
  useEffect(() => {
    setOpen(isOpen);
    cname.current = (isOpen ? 'open' : 'closed') + " drawer";
  }, [isOpen]);

  return (
    <Container className={cname.current}>
     <IconButton aria-label="Close Drawer" onClick={handleClose}><CloseCircleOutline color={'#00000'}
      height="25px"
      width="25px" sx={{marginTop: '5px'}}/></IconButton>
      <Text>Drawer</Text>
      {props.children}
    </Container>
  )
}

export default Drawer