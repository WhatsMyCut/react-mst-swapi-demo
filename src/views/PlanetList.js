import React, { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
export const PlanetList = (props) => {
  const route = 'planets/';

  return (
    <>
      <Breadcrumb route={route} />
      planetList
    </>
  )
}

export default PlanetList;