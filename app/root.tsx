import { LinksFunction, LoaderFunction } from 'remix'
import { Meta, Links, LiveReload, useCatch } from 'remix'
import { Outlet } from 'react-router-dom'

import stylesUrl from './styles/tailwind.css'

export let loader: LoaderFunction = async () => {
  return { date: new Date() }
}
export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }]
}

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" type="image/png" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <script src="/theme.js" />
      </head>
      <body className="text-base transition-colors duration-300 bg-base">
        {children}
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export function CatchBoundary() {
  let caught = useCatch()

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      )

    default:
      throw new Error(`Unexpected caught response with status: ${caught.status}`)
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws uncaught
        errors.
      </p>
    </Document>
  )
}
