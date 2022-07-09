import React from 'react';
import './App.css';
import Filters from './components/Filters';
import InputNameFilter from './components/InputNameFilter';
import Table from './components/Table';
import ProviderPlanetsContext from './context/ProviderPlanetsContext';

function App() {
  return (
    <ProviderPlanetsContext>
      <InputNameFilter />
      <Filters />
      <Table />
    </ProviderPlanetsContext>
  );
}

export default App;
