import React, { useContext, useEffect, useState } from 'react';
import planetsContext from '../context/planetsContext';
import TableRows from './TableRows';

function Table() {
  const [planets, setPlanets] = useState([]);

  const {
    data,
    loadingPlanets,
    filterByName: { name },
    filterByNumericValues,
    isOrdered,
    order,
  } = useContext(planetsContext);

  useEffect(() => {
    if (!loadingPlanets) {
      const NEGATIVE_SORT = -1;
      const POSITIVE_SORT = 1;
      const newPlanets = [...data];
      newPlanets.sort((a, b) => {
        if (a.name < b.name) return NEGATIVE_SORT;
        if (a.name > b.name) return POSITIVE_SORT;
        return 0;
      });
      setPlanets(newPlanets);
    }
  }, [data, loadingPlanets]);

  useEffect(() => {
    const filterPlanets = ({ column, comparison, value }, planetList) => {
      switch (comparison) {
      case 'maior que':
        return planetList
          .filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10));
      case 'menor que':
        return planetList
          .filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10));
      case 'igual a':
        console.log(value);
        return planetList
          .filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10));
      default:
        return planetList;
      }
    };
    if (filterByNumericValues.length !== 0) {
      const newPlanets = filterByNumericValues
        .reduce((accPlanets, currentFilter, index) => {
          let newAcc = accPlanets;
          if (index === 0) {
            newAcc = [...data];
          }
          newAcc = [...filterPlanets(currentFilter, newAcc)];
          return newAcc;
        }, []);
      setPlanets(newPlanets);
    } else {
      setPlanets(data);
    }
  }, [filterByNumericValues, data]);

  useEffect(() => {
    const sortPlanets = (planetList) => {
      const newPlanetList = [...planetList];
      if (order.sort === 'ASC') {
        return newPlanetList
          .sort((a, b) => parseInt(a[order.column], 10) - parseInt(b[order.column], 10));
      }
      if (order.sort === 'DESC') {
        return newPlanetList
          .sort((a, b) => parseInt(b[order.column], 10) - parseInt(a[order.column], 10));
      }
    };
    if (isOrdered) {
      const sortedPlanets = sortPlanets(data);
      setPlanets(sortedPlanets);
    }
  }, [data, isOrdered, order]);

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
                planets.filter(({ name: namePlanet }) => namePlanet.includes(name))
                  .map((planet) => (
                    <TableRows key={ planet.name } planet={ planet } />
                  ))
              }
            </tbody>
          </table>
        ) : <h1>Loading...</h1>
      }
    </section>
  );
}

export default Table;
