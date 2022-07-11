import React, { useContext, useState, useEffect } from 'react';
import planetsContext from '../context/planetsContext';

function Filters() {
  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const {
    setNumericFilters,
    setIsFiltered,
    filterByNumericValues,
    columnFilters,
    setColumnFilters,
  } = useContext(planetsContext);

  useEffect(() => {
    const columnValues = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    if (filterByNumericValues.length > 0) {
      const newColumnValues = columnValues
        .filter((columnValue) => filterByNumericValues
          .every(({ column }) => column !== columnValue));
      setColumnFilters(newColumnValues);
      setFilter((oldState) => ({
        ...oldState,
        column: newColumnValues[0],
      }));
    } else {
      setColumnFilters(columnValues);
      setFilter((oldState) => ({
        ...oldState,
        column: columnValues[0],
      }));
    }
  }, [filterByNumericValues, setColumnFilters]);

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
          {
            columnFilters.map((columnFilter) => (
              <option
                key={ columnFilter }
                value={ columnFilter }
              >
                { columnFilter }
              </option>
            ))
          }
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
