import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ title, children }) {
  return <>
    <Head>
      <title>{title ? title + '-Book-site' : 'Book-site'}</title>
      <meta name="description" content="Book-site" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="flex min-h-screen flex-col justify-between">
      <header>
        <nav className="flex h-12 items-center px-4 justify-between shadow-md bg-slate-200">
          <Link href="/" className="text-lg font-bold">
            Book-site
          </Link>
          <div>
            <Link href="/cart" className="p-2">
              Cart
            </Link>
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
