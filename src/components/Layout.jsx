import { Fragment } from 'react'
import { Header } from './Header'

export function Layout ({ children }) {
  return (
    <Fragment>
      <Header />

      <main className="w-full h-full p-5 bg-gray-100">
        { children && children }
      </main>
    </Fragment>
  )
}
