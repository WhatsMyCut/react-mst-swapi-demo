import React from 'react';
import { Container } from 'theme-ui'

const Breadcrumb = (props) => {
  return (
    <Container p={4} bg="muted">Breadcrumb { JSON.stringify(props) }</Container>
  )
}

export default Breadcrumb;