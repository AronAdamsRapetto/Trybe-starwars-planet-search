import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';
import TableRows from './TableRows';

function Table() {
  const { data, loadingPlanets } = useContext(planetsContext);

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
                data.map((planet) => (
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
