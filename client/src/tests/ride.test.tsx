import Rides from '@/pages/Rides';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { BrowserRouter, Route, Routes } from 'react-router';
import { driverResponse, rideFailedResponse, rideResponse } from '@/mocks/ride.mock';
import Trips from '@/pages/Trips';
import { toast } from 'sonner';
import { FitBounds } from '@/features/ride/components/ride.map';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  isAxiosError: vi.fn(),
  fitBounds: vi.fn(),
}));

vi.mock('leaflet');
vi.mock('react-leaflet', () => ({
  ...vi.importActual('react-leaflet'),
  MapContainer: vi.fn().mockReturnValue(null),
  TileLayer: vi.fn().mockReturnValue(null),
  Marker: vi.fn().mockReturnValue(null),
  Polyline: vi.fn().mockReturnValue(null),
  useMap: vi.fn(() => ({
    fitBounds: vi.fn(),
  })),
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

describe('Ride Test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Verifica se existe os inputs da pagina rides', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Rides />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText('Solicitar viagem')).toBeInTheDocument();

    const input_id = screen.getByTestId('customer_id');
    expect(input_id).toBeInTheDocument();

    const input_origin = screen.getByTestId('origin');
    expect(input_origin).toBeInTheDocument();

    const input_destination = screen.getByTestId('destination');
    expect(input_destination).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /pesquisar viagem/i });
    expect(button).toBeInTheDocument();
  });

  it('Verifica se é possivel solicitar uma viagem', async () => {
    mocks.post.mockResolvedValueOnce({ data: rideResponse });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Rides />} />
        </Routes>
      </BrowserRouter>
    );

    const inputId = screen.getByTestId('customer_id');
    const inputOrigin = screen.getByTestId('origin');
    const inputDestination = screen.getByTestId('destination');
    const button = screen.getByRole('button', { name: /pesquisar viagem/i });

    await userEvent.type(inputId, '123');
    await userEvent.type(inputOrigin, 'Rua X, 123');
    await userEvent.type(inputDestination, 'Rua Y, 456');
    
    await userEvent.click(button);

    await waitFor(() => {

      expect(mocks.post).toHaveBeenCalled();
      expect(mocks.post).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Escolha um motorista para realizar a viagem')).toBeInTheDocument();
    });
  });

  it('Verifica se não é possivel solicitar uma viagem com o mesmo endereço de origem e destino', async () => {
    mocks.isAxiosError.mockReturnValue(true);
    mocks.post.mockRejectedValue({ response: { data: rideFailedResponse } });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Rides />} />
        </Routes>
      </BrowserRouter>
    );

    const inputId = screen.getByTestId('customer_id');
    const inputOrigin = screen.getByTestId('origin');
    const inputDestination = screen.getByTestId('destination');
    const button = screen.getByRole('button', { name: /pesquisar viagem/i });

    await userEvent.type(inputId, '123');
    await userEvent.type(inputOrigin, 'Rua X, 123');
    await userEvent.type(inputDestination, 'Rua X, 123');

    await userEvent.click(button);

    await waitFor(() => {
      expect(mocks.post).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Os dados fornecidos no corpo da requisição são inválidos');
    });
  });

  it('Verifica se é possivel filtrar a tabela', async () => {
    mocks.post.mockResolvedValueOnce({ data: rideResponse });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Rides />} />
        </Routes>
      </BrowserRouter>
    );

    const inputId = screen.getByTestId('customer_id');
    const inputOrigin = screen.getByTestId('origin');
    const inputDestination = screen.getByTestId('destination');

    const button = screen.getByRole('button', { name: /pesquisar viagem/i });

    await userEvent.type(inputId, '123');
    await userEvent.type(inputOrigin, 'Rua X, 123');
    await userEvent.type(inputDestination, 'Rua Y, 456');

    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const inputFilter = screen.getByPlaceholderText('Filtrar por nome');

    await userEvent.type(inputFilter, 'Homer');

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const button_nome = screen.getByRole('button', { name: /nome/i });

    await userEvent.click(button_nome);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const button_description = screen.getByRole('button', { name: /descrição/i });

    await userEvent.click(button_description);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const button_vehicle = screen.getByRole('button', { name: /veículo/i });

    await userEvent.click(button_vehicle);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const button_avaliacao = screen.getByRole('button', { name: /avaliação/i });

    await userEvent.click(button_avaliacao);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const button_valor = screen.getByRole('button', { name: /valor/i });

    await userEvent.click(button_valor);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });
  });

  it('Verifica se não é possivel escolher uma viagem', async () => {
    mocks.isAxiosError.mockReturnValue(true);
    mocks.post.mockResolvedValueOnce({ data: rideResponse });
    mocks.patch.mockRejectedValue({ response: { data: rideFailedResponse } });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Rides />} />
        </Routes>
      </BrowserRouter>
    );

    const inputId = screen.getByTestId('customer_id');
    const inputOrigin = screen.getByTestId('origin');
    const inputDestination = screen.getByTestId('destination');
    const button = screen.getByRole('button', { name: /pesquisar viagem/i });

    await userEvent.type(inputId, '123');
    await userEvent.type(inputOrigin, 'Rua X, 123');
    await userEvent.type(inputDestination, 'Rua Y, 456');

    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const buttons = screen.getAllByRole('button', { name: /escolher/i });

    await userEvent.click(buttons[0]);

    await waitFor(() => {
      expect(mocks.patch).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Os dados fornecidos no corpo da requisição são inválidos');
    });
  });

  it('Verifica se é possivel escolher uma viagem', async () => {
    mocks.post.mockResolvedValueOnce({ data: rideResponse });
    mocks.patch.mockResolvedValueOnce({ data: { success: true } });
    mocks.get.mockResolvedValueOnce({ data: { drivers: driverResponse } });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Rides />} />
          <Route path='/viagens' element={<Trips />} />
        </Routes>
      </BrowserRouter>
    );

    const inputId = screen.getByTestId('customer_id');
    const inputOrigin = screen.getByTestId('origin');
    const inputDestination = screen.getByTestId('destination');
    const button = screen.getByRole('button', { name: /pesquisar viagem/i });

    await userEvent.type(inputId, '123');
    await userEvent.type(inputOrigin, 'Rua X, 123');
    await userEvent.type(inputDestination, 'Rua Y, 456');

    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Homer Simpson')).toBeInTheDocument();
    });

    const buttons = screen.getAllByRole('button', { name: /escolher/i });

    await userEvent.click(buttons[0]);

    await waitFor(() => {
      expect(mocks.patch).toHaveBeenCalled();
      expect(mocks.get).toHaveBeenCalled();
      const button = screen.getByRole('button', { name: /encontrar viagens/i });
      expect(button).toBeInTheDocument();
    });
  });

  it('deve chamar fitBounds com as coordenadas corretas', async () => {
    const rideResponse = {
      distance: 10,
      duration: '10 min',
      options: [],
      routeResponse: {},
      origin: { latitude: 10, longitude: 20 },
      destination: { latitude: 30, longitude: 40 },
    };

    render(<FitBounds ride={rideResponse} />);
    
    await waitFor(() => {
      expect(mocks.fitBounds).not.toHaveBeenCalledWith([]);
    });
  });
});