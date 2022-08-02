import { Container, Flex, NavLink, Text } from 'theme-ui'
import React, { useEffect, useState } from 'react';

const Breadcrumb = (props) => {
  const { currentCategory, currentRow } = props;
  const [category, setCatetory]  = useState(currentCategory);
  const [row, setRow]  = useState(currentRow);

  useEffect(() => {
    if (currentCategory && currentCategory.name && currentCategory.name !== category) setCatetory(currentCategory.name );
    if (currentRow && currentRow.name && currentRow.name !== row) setRow(currentRow.name );
  }, [currentCategory, currentRow])

  // console.log('Breadcrumb', {row});
  return (
    <Container p={4} bg="muted">
      <Flex as="nav">
        <NavLink href="/" p={2}>
          Home
        </NavLink>
        <Text sx={{marginTop: '8px'}}>{ '>' }</Text>
        <NavLink href="/catagories" p={2}>
          { category ? String(category[0]).toUpperCase() + String(category).slice(1) : 'Categories >' }
        </NavLink>
        { row  &&
          <>
          <Text sx={{marginTop: '8px'}}>{ '>' }</Text>
          <NavLink href="/planets/" p={2}>
            { row }
          </NavLink>
          </>
        }
      </Flex>
    </Container>
  )
}

export default Breadcrumb;
