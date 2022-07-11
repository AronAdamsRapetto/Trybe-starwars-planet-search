import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

function SortForm() {
  const { columnFilters, order, setOrder, setIsOrdered } = useContext(planetsContext);

  const handleChange = ({ target: { name, value } }) => {
    setOrder((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };

  const handleClick = () => {
    setIsOrdered(true);
  };

  return (
    <section>
      <label htmlFor="column-sort">
        Ordem
        <select
          id="column-sort"
          data-testid="column-sort"
          name="column"
          onChange={ handleChange }
          value={ order.column }
        >
          {
            columnFilters.map((filter) => (
              <option key={ filter } value={ filter }>{ filter }</option>
            ))
          }
        </select>
      </label>
      <label htmlFor="asc-radio">
        Ascendente
        <input
          type="radio"
          name="sort"
          id="asc-radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ handleChange }
          checked={ order.sort === 'ASC' }
        />
      </label>
      <label htmlFor="desc-radio">
        Descendente
        <input
          type="radio"
          name="sort"
          id="desc-radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ handleChange }
          checked={ order.sort === 'DESC' }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleClick }
      >
        Ordenar
      </button>
    </section>
  );
}

export default SortForm;
