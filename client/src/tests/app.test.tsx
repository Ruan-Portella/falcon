import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '@/App'

describe('App', () => {
  it('Renderiza o app corretamente', () => {
    render(
      <App />
    )
    expect(screen.getByText('Solicitar viagem')).toBeInTheDocument()
  })
})
