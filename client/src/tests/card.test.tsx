import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

describe('Card', () => {
  it('renderiza o componente card corretamente', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardDescription>Description</CardDescription>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
  })
})
