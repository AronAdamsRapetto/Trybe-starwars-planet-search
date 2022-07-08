import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './planetsContext';

function ProviderPlanetsContext({ children }) {
  const [data, setData] = useState([]);
  const [loadingPlanets, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const planets = await fetch(endPoint).then((response) => response.json());
      setData(planets.results.map((planet) => {
        delete planet.residents;
        return planet;
      }));
      setLoading(false);
    };
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
    loadingPlanets,
  };

  return (
    <planetsContext.Provider value={ contextValue }>
      {
        children
      }
    </planetsContext.Provider>
  );
}

ProviderPlanetsContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderPlanetsContext;
