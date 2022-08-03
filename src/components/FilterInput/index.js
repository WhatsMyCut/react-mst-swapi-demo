import { Container, Input, IconButton, Text } from 'theme-ui'
import { FilterCircleOutline } from 'react-ionicons'
import './styles.scss'

export const FilterInput = (props) => {
  const { handleFilter, inputRef } = props;
  return (
    <Container sx={{ display: 'flex', alignContent: 'flex-start', verticalAlign: 'middle' }}>
      <Text sx={{ padding: '5px', }}>Filter results:</Text>
      <IconButton aria-label="Filter Results"><FilterCircleOutline color={'#00000'}
      height="25px"
      width="25px" sx={{marginTop: '5px'}}/></IconButton>
      <Input ref={inputRef} onChange={handleFilter} sx={{flex: 1, }} />
    </Container>
  )
}

export default FilterInput;
