import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetPortal, SheetTrigger, SheetOverlay, SheetFooter, SheetTitle } from '@/components/ui/sheet'

describe('Sheet', () => {
  it('renderiza o componente sheet corretamente', () => {
    render(
      <Sheet>
        <SheetOverlay />
        <SheetTitle>
          Title
        </SheetTitle>
        <SheetTrigger>Open</SheetTrigger>
        <SheetPortal />
        <SheetClose />
        <SheetHeader className='flex'>
          Header
        </SheetHeader>
        <SheetDescription>
          <button>Solicitar viagem</button>
        </SheetDescription>
        <SheetContent>
          Content
        </SheetContent>
        <SheetFooter>
          Footer
        </SheetFooter>
      </Sheet>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
  })
})
