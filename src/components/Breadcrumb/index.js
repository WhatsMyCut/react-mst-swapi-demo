import React from 'react';
import { Container, NavLink, Flex } from 'theme-ui'

const Breadcrumb = (props) => {
  console.log('Breadcrumb', {props});
  return (
    <Container p={4} bg="muted">
      <Flex as="nav">
        <NavLink href="#!" p={2}>
          Home
        </NavLink>
        <NavLink href="#!" p={2}>
          Blog
        </NavLink>
        <NavLink href="#!" p={2}>
          About
        </NavLink>
      </Flex>
    </Container>
  )
}

export default Breadcrumb;