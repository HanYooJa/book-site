import Head from 'next/head'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { signOut, useSession } from 'next-auth/react'
import { Menu } from '@headlessui/react'
import DropdownLink from './DropdownLink'
import Cookies from 'js-cookie'
import React from 'react'

export default function Layout({ title, children }) {
  const { status, data: session } = useSession()
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const [cartItemsCount, setCartItemsCount] = useState(0)
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])
  const logoutClickHandler = () => {
    Cookies.remove('cart')
    dispatch({ type: 'CART_RESET' })
    signOut({ callbackUrl: '/login' })
  }

  return <>
    <Head>
      <title>{title ? title + '- NextShop' : 'NextShop'}</title>
      <meta name="description" content="Nextjs Ecommerce" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ToastContainer position="bottom-center" limit={1} />

    <div className="flex min-h-screen flex-col justify-between">
      <header>
        <nav className="flex h-12 items-center px-4 justify-between shadow-md bg-slate-200">
          <Link href="/" className="text-lg font-bold">
            Book-site
          </Link>
          <div>
            <Link href="/cart" className="p-2" legacyBehavior>
              Cart
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            {status === 'loading' ? (
              'Loading'
            ) : session?.user ? (
              <Menu as="div" className="relative inline-block">
                <Menu.Button className="text-blue-600">
                  {session.user.name}
                </Menu.Button>

                <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg ">
                  <Menu.Item>
                    <DropdownLink href="/profile">
                      <a className="dropdown-link">Profile</a>
                    </DropdownLink>
                  </Menu.Item>

                  <Menu.Item>
                    <DropdownLink href="/order-history">
                      <a className="dropdown-link">Order History</a>
                    </DropdownLink>
                  </Menu.Item>

                  <Menu.Item>
                    <a
                      className="dropdown-link"
                      href="#"
                      onClick={logoutClickHandler}
                    >
                      Logout
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <Link href="/login" className="p-2">
                Login
              </Link>
            )}

            <Link href="/login" className="p-2">
              Login
            </Link>
          </div>
        </nav>
      </header>
      <main className="container m-auto mt-4 px-4">{children}</main>
      <footer className="flex h-10 justify-center items-center shadow-inner bg-red-100">
        <p>Copyright &copy; 2022 Book-site</p>
      </footer>
    </div>
  </>;
}
