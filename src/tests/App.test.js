import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import response from './mockResponse';
import userEvent from '@testing-library/user-event';

describe('Testes referentes a aplicação inteira', () => {

  const { results }  = response;
  const filteredResults = results.map((planets) => {
    delete planets.residents
    return planets;
  })
  const tableHeads = Object.keys(filteredResults[0]);

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(response),
    }))
  });
  
  afterEach(() => jest.clearAllMocks());

  it('Verifica se ao abrir a página os elementos são renderizados corretamente', async () => {
    render(<App />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /coluna/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /operador/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filtrar/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /ordem/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /ascendente/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /descendente/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ordenar/i })).toBeInTheDocument();

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(tableHeads).toHaveLength(13);
    
    tableHeads.forEach((head) => {
      const headElement = screen.getByRole('columnheader', { name: head });
      expect(headElement).toBeInTheDocument();
      expect(headElement).not.toHaveTextContent('residents');
    });
    
    expect(screen.getAllByTestId('planet-name').length).toBe(10);
  });

  it('Verifica se o filtro ocorre corretamente ao digitar no input', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const inputFilter = screen.getByRole('textbox');

    expect(screen.getAllByTestId('planet-name').length).toBe(10);

    userEvent.type(inputFilter, 'o');

    expect(screen.getAllByTestId('planet-name').length).toBe(7);

    userEvent.type(inputFilter, 'o');

    expect(screen.getAllByTestId('planet-name').length).toBe(2);

  });

  it('Verifica se o filtro númerico funciona corretamente', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    
    const columnInput = screen.getByRole('combobox', { name: /coluna/i });
    const comparisonInput = screen.getByRole('combobox', { name: /operador/i });
    const valueInput = screen.getByRole('spinbutton');
    const filterButton = screen.getByRole('button', { name: /filtrar/i });

    expect(columnInput).toHaveValue('population');
    expect(comparisonInput).toHaveValue('maior que');
    expect(valueInput).toHaveValue(0);
    expect(columnInput.children.length).toBe(5);

    userEvent.click(filterButton);

    expect(screen.getAllByTestId('planet-name').length).toBe(8);
    expect(columnInput.children.length).toBe(4);
    
    const headingElement = screen.getByRole('heading', { name: /filtros aplicados/i });
    const btnExcludeAll = screen.getByRole('button', { name: /remover todas filtragens/i });

    expect(headingElement).toBeInTheDocument();
    expect(btnExcludeAll).toBeInTheDocument();
    expect(screen.getByText(/population maior que 0/i)).toBeInTheDocument();

    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(comparisonInput, 'menor que');
    userEvent.clear(valueInput);
    userEvent.type(valueInput, '11000');
    
    userEvent.click(filterButton);

    expect(screen.getAllByTestId('planet-name').length).toBe(3);
    expect(screen.getByText(/population maior que 0/i)).toBeInTheDocument();
    expect(screen.getByText(/diameter menor que 11000/i)).toBeInTheDocument();

    userEvent.selectOptions(columnInput, 'rotation_period');
    userEvent.selectOptions(comparisonInput, 'igual a');
    userEvent.clear(valueInput);
    userEvent.type(valueInput, '24');
    
    userEvent.click(filterButton);    
    
    const btnExcludeFilter = screen.getAllByTestId('button-exclude-filter');

    expect(btnExcludeFilter).toHaveLength(3);
    expect(columnInput.children.length).toBe(2);
    expect(screen.getAllByTestId('planet-name').length).toBe(1);
    expect(screen.getByText(/population maior que 0/i)).toBeInTheDocument();
    expect(screen.getByText(/diameter menor que 11000/i)).toBeInTheDocument();
    expect(screen.getByText(/rotation_period igual a 24/i)).toBeInTheDocument();

    userEvent.click(btnExcludeFilter[0]);
    
    expect(screen.queryByText(/population maior que 0/i)).not.toBeInTheDocument();
    expect(screen.getAllByTestId('planet-name').length).toBe(1);
    expect(columnInput.children.length).toBe(3);

    userEvent.click(btnExcludeAll);

    expect(headingElement).not.toBeInTheDocument();
    expect(btnExcludeAll).not.toBeInTheDocument();
    expect(screen.queryByText(/diameter menor que 11000/i)).not.toBeInTheDocument();
  });

  it('Verifica se o ordenador funciona corretamente', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getAllByRole('row')[1].children[0]).toHaveTextContent('Alderaan');

    const columnInput = screen.getByRole('combobox', { name: /ordem/i });
    const DscRadio = screen.getByRole('radio', { name: /descendente/i });
    const btnOrdenar = screen.getByRole('button', { name: /ordenar/i });
    
    userEvent.click(btnOrdenar);

    expect(screen.getAllByRole('row')[1].children[0]).toHaveTextContent('Yavin IV');

    userEvent.selectOptions(columnInput, 'rotation_period');
    userEvent.click(DscRadio);

    userEvent.click(btnOrdenar);

    expect(screen.getAllByRole('row')[1].children[0]).toHaveTextContent('Kamino');
  });
});
