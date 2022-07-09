import React, { useContext, useState } from 'react';
import planetsContext from '../context/planetsContext';

function Filters() {
  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const { setNumericFilters, setIsFiltered } = useContext(planetsContext);

  const handleChange = ({ target: { value, name } }) => {
    setFilter((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };

  const handleClick = () => {
    setNumericFilters((oldState) => [...oldState, filter]);
    setIsFiltered(true);
  };

  return (
    <form>
      <label htmlFor="collumn-filter">
        Coluna
        <select
          id="collumn-filter"
          data-testid="column-filter"
          name="column"
          onChange={ handleChange }
          value={ filter.column }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operador
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          name="comparison"
          onChange={ handleChange }
          value={ filter.comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        placeholder="Valor de comparação"
        name="value"
        onChange={ handleChange }
        value={ filter.value }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filters;
