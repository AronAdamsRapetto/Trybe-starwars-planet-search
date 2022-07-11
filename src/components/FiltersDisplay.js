import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

function FiltersDisplay() {
  const {
    filterByNumericValues,
    isFiltered,
    setNumericFilters,
    setIsFiltered,
  } = useContext(planetsContext);

  const handleClick = (indexToExclude) => {
    if (filterByNumericValues.length === 1) {
      setIsFiltered(false);
    }
    setNumericFilters((oldState) => oldState
      .filter((_filter, index) => index !== indexToExclude));
  };

  const handleClickExcludeAll = () => {
    setNumericFilters([]);
    setIsFiltered(false);
  };

  return (
    <section>
      {
        isFiltered && (
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
