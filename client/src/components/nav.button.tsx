import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { NavLink } from 'react-router'

type NavButtonProps = {
  href: string
  label: string
  isActive?: boolean
}

export default function NavButton({
  href,
  label,
  isActive
}: NavButtonProps) {
  return (
    <Button asChild size='sm' variant='outline' className={cn('w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition', isActive ? 'bg-white/10' : 'bg-transparent')}>
      <NavLink to={href}>
        {label}
      </NavLink>
    </Button>
  )
}
