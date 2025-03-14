'use client'

import Link from 'next/link'
import { Popover, PopoverButton, PopoverBackdrop, PopoverPanel } from '@headlessui/react'
import clsx from 'clsx'
import { NavLink } from './NavLink'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { useAuth } from '@/providers/auth.providers'

function MobileNavLink({href,children,}: { href: string, children: React.ReactNode}) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {

    const { user } = useAuth();

    return (
        <Popover>
        <PopoverButton
            className="relative z-10 flex h-8 w-8 items-center justify-center focus:not-data-focus:outline-hidden"
            aria-label="Toggle Navigation"
        >
            {({ open }) => <MobileNavIcon open={open} />}
        </PopoverButton>
        <PopoverBackdrop
            transition
            className="fixed inset-0 bg-slate-300/50 duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
        />
        <PopoverPanel
            transition
            className="w-[300px] absolute right-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 ring-1 shadow-xl ring-slate-900/5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
        > 
        {!user ?
            <>
                <MobileNavLink href="/">Home</MobileNavLink>
                <MobileNavLink href="/pricing">Pricing</MobileNavLink>
                <MobileNavLink href="/contact">Contact</MobileNavLink>
                <hr className="m-2 border-slate-300/40" />
                <MobileNavLink href="/login">Sign In</MobileNavLink>
            </>
        :            
            <>
                <MobileNavLink href="/account">My Account</MobileNavLink>
                <hr className="m-2 border-slate-300/40" />
                <MobileNavLink href="/pricing">Home</MobileNavLink>
                <MobileNavLink href="/pricing">Pricing</MobileNavLink>
                <MobileNavLink href="/contact">Contact</MobileNavLink>
            </>
            }
        </PopoverPanel>
        </Popover>
    )
}

function DesktopNavigation() {
    return (
        <Popover>
          <PopoverButton
            className="relative z-10 flex h-8 w-8 items-center justify-center focus:not-data-focus:outline-hidden"
            aria-label="Toggle Navigation"
          >
            {({ open }) => <MobileNavIcon open={open} />}
          </PopoverButton>
          <PopoverBackdrop
            transition
            className="fixed inset-0 bg-slate-300/50 duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
          />
          <PopoverPanel
            transition
            className="w-[300px] absolute right-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 ring-1 shadow-xl ring-slate-900/5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
          > 
            <MobileNavLink href="/account">My Account</MobileNavLink>
          </PopoverPanel>
        </Popover>
      )
}

export function Header() {

    const { user } = useAuth();

    return (
        <header className="py-10">
        <Container>
            <nav className="relative z-50 flex justify-between">
            <div className="flex items-center md:gap-x-12">
                <Link href="#" aria-label="Home">
                <Logo className="h-10 w-auto" />
                </Link>
                <div className="hidden md:flex md:gap-x-6">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/pricing">Pricing</NavLink>
                <NavLink href="/contact">Contact</NavLink>
                </div>
            </div>
            <div className="flex items-center gap-x-5 md:gap-x-8">
                { user ?
                  // TODO: Navigate to chat app when route is determined 
                  <Button href="/chat app" color="blue">
                      <span>
                          Launch App
                      </span>
                  </Button>
                : 
                  <>
                    <div className="hidden md:block">
                      <NavLink href="/login">Sign in</NavLink>
                    </div>
                    <Button href="/register" color="blue">
                      <span>
                          Get started <span className="hidden lg:inline">today</span>
                      </span>
                    </Button>
                  </>
                }
                <div className="-mr-1 flex md:hidden">
                    <MobileNavigation/>
                </div>
                { user && (
                  <div className="-mr-1 hidden md:flex">
                      <DesktopNavigation/>  
                  </div>
                )}
            </div>
            </nav>
        </Container>
        </header>
    )
}
