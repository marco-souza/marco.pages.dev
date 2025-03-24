import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  const name = c.req.param('name')
  return c.json({
    'your name is': name,
  })
})
