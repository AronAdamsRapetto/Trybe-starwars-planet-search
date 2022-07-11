import React from 'react';
import './App.css';
import Filters from './components/Filters';
import FiltersDisplay from './components/FiltersDisplay';
import InputNameFilter from './components/InputNameFilter';
import SortForm from './components/SortForm';
import Table from './components/Table';
import ProviderPlanetsContext from './context/ProviderPlanetsContext';

function App() {
  return (
    <ProviderPlanetsContext>
      <InputNameFilter />
      <Filters />
      <FiltersDisplay />
      <SortForm />
      <Table />
    </ProviderPlanetsContext>
  );
}

export default App;
