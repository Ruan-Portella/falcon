import Trips from '@/pages/Trips';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { BrowserRouter, Route, Routes } from 'react-router';
import { driverResponse } from '@/mocks/ride.mock';
import { toast } from 'sonner';
import { TripFailedResponse, TripOptionsResponse, TripResponse } from '@/mocks/trip.mock';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  isAxiosError: vi.fn(),
}));

vi.spyOn(toast, 'error');

vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>();

  const mockAxios = {
    default: {
      ...actual.default,
      isAxiosError: mocks.isAxiosError,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
        patch: mocks.patch,
      })),
    },
  };

  return mockAxios;
});

describe('Trip Test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Verifica se existe os inputs da pagina tripes', () => {
    mocks.get.mockResolvedValueOnce({ data: { drivers: driverResponse } });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Trips />} />
        </Routes>
      </BrowserRouter>
    );

    const input_id = screen.getByTestId('customer_id');
    expect(input_id).toBeInTheDocument();

    const select_driver = screen.getByRole('combobox');
    expect(select_driver).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /encontrar viagens/i });
    expect(button).toBeInTheDocument();
  });

  it('Verifica se é possivel encontrar viagens', async () => {
    mocks.get.mockResolvedValueOnce({ data: { drivers: driverResponse } });
    mocks.get.mockResolvedValueOnce({ data: TripResponse });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Trips />} />
        </Routes>
      </BrowserRouter>
    );

    const inputId = screen.getByTestId('customer_id');
    const button = screen.getByRole('button', { name: /Encontrar viagens/i });

    await userEvent.type(inputId, '123');
    await userEvent.type(inputId, '123');

    await userEvent.click(button);

    await waitFor(() => {
      expect(mocks.get).toHaveBeenCalled();
      expect(mocks.get).toHaveBeenCalledTimes(2);
    });
  });
  //   mocks.get.mockResolvedValueOnce({ data: { drivers: driverResponse } });
  //   mocks.get.mockResolvedValueOnce({ data: TripResponse });

  //   render(
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<Trips />} />
  //       </Routes>
  //     </BrowserRouter>
  //   );

  //   const inputId = screen.getByTestId('customer_id');
  //   const selectDriver = screen.getByRole('combobox');

  //   await userEvent.click(selectDriver);

  //   expect(selectDriver).toHaveAttribute('aria-expanded', 'true');

  //   const button = screen.getByRole('button', { name: /Encontrar viagens/i });

  //   await userEvent.type(inputId, '123');
  //   await userEvent.type(inputId, '123');

  //   await userEvent.click(button);

  //   await waitFor(() => {
  //     expect(mocks.get).toHaveBeenCalled();
  //     expect(mocks.get).toHaveBeenCalledTimes(2);
  //   });
  // });

  it('Verifica se não é possivel encontrar viagens quando passado um id errado', async () => {
    mocks.isAxiosError.mockReturnValue(true);
    mocks.get.mockResolvedValueOnce({ data: { drivers: driverResponse } });
    mocks.get.mockRejectedValue({ response: { data: TripFailedResponse } });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Trips />} />
        </Routes>
      </BrowserRouter>
    );

    const inputId = screen.getByTestId('customer_id');
    const button = screen.getByRole('button', { name: /Encontrar viagens/i });

    await userEvent.type(inputId, '78');
    await userEvent.type(inputId, '78');

    await userEvent.click(button);

    await waitFor(() => {
      expect(mocks.get).toHaveBeenCalled();
      expect(mocks.get).toHaveBeenCalledTimes(2);

      expect(toast.error).toHaveBeenCalledWith('Nenhum registro encontrado');
    });
  });

  it('Verifica se pode vir nenhum motorista', async () => {
    mocks.isAxiosError.mockReturnValue(true);
    mocks.get.mockRejectedValue({ response: { data: TripOptionsResponse } });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Trips />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mocks.get).toHaveBeenCalled();

      expect(toast.error).toHaveBeenCalledWith('Nenhum registro encontrado');
    });
  });
 
  it('Verifica se é possivel filtrar a tabela', async () => {
    mocks.get.mockResolvedValueOnce({ data: { drivers: driverResponse } });
    mocks.get.mockResolvedValueOnce({ data: TripResponse });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Trips />} />
        </Routes>
      </BrowserRouter>
    );

    const inputId = screen.getByTestId('customer_id');
    const button = screen.getByRole('button', { name: /Encontrar viagens/i });

    await userEvent.type(inputId, '123');
    await userEvent.type(inputId, '123');

    await userEvent.click(button);

    await waitFor(() => {
      expect(mocks.get).toHaveBeenCalled();
      expect(mocks.get).toHaveBeenCalledTimes(2);
    });

    const inputFilter = screen.getByPlaceholderText('Filtrar por nome');

    await userEvent.type(inputFilter, 'Homer');

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const button_date = screen.getByRole('button', { name: /Data e Hora da Viagem/i });

    await userEvent.click(button_date);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const button_name = screen.getByRole('button', { name: /Nome do Motorista/i });

    await userEvent.click(button_name);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const button_origem = screen.getByRole('button', { name: /origem/i });

    await userEvent.click(button_origem);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const button_destino = screen.getByRole('button', { name: /destino/i });

    await userEvent.click(button_destino);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const button_valor = screen.getByRole('button', { name: /valor/i });

    await userEvent.click(button_valor);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const button_distancia = screen.getByRole('button', { name: /distância/i });

    await userEvent.click(button_distancia);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const button_tempo = screen.getByRole('button', { name: /tempo/i });

    await userEvent.click(button_tempo);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });
  });
});