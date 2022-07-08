import React from 'react';
import './App.css';
import Table from './components/Table';
import ProviderPlanetsContext from './context/ProviderPlanetsContext';

function App() {
  return (
    <ProviderPlanetsContext>
      <Table />
    </ProviderPlanetsContext>
  );
}

export default App;
