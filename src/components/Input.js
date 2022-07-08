import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

function Input() {
  const { filterByName: { name }, setNameFilter } = useContext(planetsContext);
  return (
    <input
      type="text"
      placeholder="Filtre pelo nome"
      name="name"
      onChange={ ({ target: { value } }) => setNameFilter(value) }
      value={ name }
      data-testid="name-filter"
    />
  );
}

export default Input;
