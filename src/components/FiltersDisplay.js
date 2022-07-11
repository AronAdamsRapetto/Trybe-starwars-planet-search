import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

function FiltersDisplay() {
  const {
    filterByNumericValues,
    setNumericFilters,
  } = useContext(planetsContext);

  const handleClick = (indexToExclude) => {
    setNumericFilters((oldState) => oldState
      .filter((_filter, index) => index !== indexToExclude));
  };

  const handleClickExcludeAll = () => {
    setNumericFilters([]);
  };

  return (
    <section>
      {
        filterByNumericValues.length !== 0 && (
          <div>
            <h3>Filtros Aplicados</h3>
            <button
              type="button"
              data-testid="button-remove-filters"
              onClick={ handleClickExcludeAll }
            >
              Remover todas filtragens
            </button>
            {
              filterByNumericValues.map(({ column, comparison, value }, index) => (
                <div key={ column } data-testid="filter">
                  <span>{`${column} ${comparison} ${value}`}</span>
                  <button
                    type="button"
                    onClick={ () => handleClick(index) }
                  >
                    X
                  </button>
                </div>
              ))
            }
          </div>
        )
      }
    </section>
  );
}

export default FiltersDisplay;
