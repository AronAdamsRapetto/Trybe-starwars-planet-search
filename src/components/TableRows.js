import React from 'react';
import PropTypes from 'prop-types';

function TableRows({ planet }) {
  // const {
  //   name,
  //   rotation_period: rotationPeriod,
  //   orbital_period: orbitalPeriod,
  //   diameter,
  //   gravity,
  //   terrain,
  //   surface_water: surfaceWater,
  //   population,
  //   films,
  //   created,
  //   edited,
  //   url,
  // } = planet;
  return (
    <tr>
      {/* <td>{ name }</td>
      <td>{ rotationPeriod }</td>
      <td>{ orbitalPeriod }</td>
      <td>{ diameter }</td>
      <td>{ gravity }</td>
      <td>{ terrain }</td>
      <td>{ surfaceWater }</td>
      <td>{ population }</td>
      <td>{ films }</td>
      <td>{ created }</td>
      <td>{ edited }</td>
      <td>{ url }</td> */}

      {
        Object.values(planet).map((value) => (<td key={ value }>{ value }</td>))
      }
    </tr>
  );
}

TableRows.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rotation_period: PropTypes.string.isRequired,
    orbital_period: PropTypes.string.isRequired,
    diameter: PropTypes.string.isRequired,
    gravity: PropTypes.string.isRequired,
    terrain: PropTypes.string.isRequired,
    surface_water: PropTypes.string.isRequired,
    population: PropTypes.string.isRequired,
    films: PropTypes.arrayOf(PropTypes.string).isRequired,
    created: PropTypes.string.isRequired,
    edited: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default TableRows;
