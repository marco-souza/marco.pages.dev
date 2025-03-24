import { ErrorHandler } from 'hono'

const handler: ErrorHandler = (e, c) => {
  return c.render(<h1>Oops, something went wrong! {e.message}</h1>)
}

export default handler
