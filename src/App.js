import React from 'react';
import './App.css';
import Filters from './components/Filters';
import FiltersDisplay from './components/FiltersDisplay';
import InputNameFilter from './components/InputNameFilter';
import Table from './components/Table';
import ProviderPlanetsContext from './context/ProviderPlanetsContext';

function App() {
  return (
    <ProviderPlanetsContext>
      <InputNameFilter />
      <Filters />
      <FiltersDisplay />
      <Table />
    </ProviderPlanetsContext>
  );
}

export default App;
