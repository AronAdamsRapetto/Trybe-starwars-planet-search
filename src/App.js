import React from 'react';
import './App.css';
import Input from './components/Input';
import Table from './components/Table';
import ProviderPlanetsContext from './context/ProviderPlanetsContext';

function App() {
  return (
    <ProviderPlanetsContext>
      <Input />
      <Table />
    </ProviderPlanetsContext>
  );
}

export default App;
