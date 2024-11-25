import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

describe('Table Test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Verifica se existe o componente Table', () => {
    render(
      <Table>
        <TableCaption>
          Solicitar viagem
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              Header
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <button>Solicitar viagem</button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              Footer
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    const button = screen.getByRole('button', { name: /solicitar viagem/i });

    expect(button).toBeInTheDocument();
  });
});