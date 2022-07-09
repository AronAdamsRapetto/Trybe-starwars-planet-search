import React, { useContext, useEffect, useState } from 'react';
import planetsContext from '../context/planetsContext';
import TableRows from './TableRows';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const {
    data,
    loadingPlanets,
    filterByName: { name },
    filterByNumericValues,
    isFiltered,
  } = useContext(planetsContext);

  useEffect(() => {
    if (!loadingPlanets) {
      setPlanets(data);
    }
  }, [data, loadingPlanets]);

  useEffect(() => {
    const filterPlanets = ({ column, comparison, value }) => {
      switch (comparison) {
      case 'maior que':
        return planets
          .filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10));
      case 'menor que':
        return planets
          .filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10));
      case 'igual a':
        console.log(value);
        return planets
          .filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10));
      default:
        return planets;
      }
    };
    if (isFiltered) {
      const newPlanets = filterByNumericValues
        .map((filter) => filterPlanets(filter));
      setFilteredPlanets(newPlanets[0]);
    }
  }, [filterByNumericValues, isFiltered, planets]);

  return (
    <section>
      {
        !loadingPlanets ? (
          <table>
            <thead>
              <tr>
                {
                  Object.keys(data[0]).map((key) => (
                    <th key={ key }>{ key }</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                isFiltered
                  ? (
                    filteredPlanets
                      .filter(({ name: namePlanet }) => namePlanet.includes(name))
                      .map((planet) => (
                        <TableRows key={ planet.name } planet={ planet } />
                      ))
                  ) : (
                    planets.filter(({ name: namePlanet }) => namePlanet.includes(name))
                      .map((planet) => (
                        <TableRows key={ planet.name } planet={ planet } />
                      ))
                  )
              }
            </tbody>
          </table>
        ) : <h1>Loading...</h1>
      }
    </section>
  );
}

export default Table;
