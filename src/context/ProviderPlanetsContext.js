import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './planetsContext';

function ProviderPlanetsContext({ children }) {
  const [data, setData] = useState([]);
  const [loadingPlanets, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [columnFilters, setColumnFilters] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });
  const [isOrdered, setIsOrdered] = useState(false);

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
    filterByName: {
      name: nameFilter,
    },
    setNameFilter,
    filterByNumericValues: numericFilters,
    setNumericFilters,
    isFiltered,
    setIsFiltered,
    columnFilters,
    setColumnFilters,
    order,
    setOrder,
    isOrdered,
    setIsOrdered,
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
