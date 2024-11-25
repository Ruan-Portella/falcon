import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useMedia } from 'react-use'
import Navigation from '@/components/navigation'
import { BrowserRouter, Route, Routes } from 'react-router'
import userEvent from '@testing-library/user-event'

vi.mock('react-use', () => ({
  useMedia: vi.fn(),
}))

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/' }),
}))

describe('Navigation', () => {
  it('renderiza o componente navigation corretamente', async () => {
    vi.mocked(useMedia).mockReturnValue(true)

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />} />
        </Routes>
      </BrowserRouter>
    )

    expect(screen.getAllByRole('button')[0]).toBeInTheDocument()

    await userEvent.click(screen.getAllByRole('button')[0])

    expect(screen.getByText('Início')).toBeInTheDocument()

    await userEvent.click(screen.getByText('Início'))
  })
})
