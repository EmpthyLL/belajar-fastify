const fastify = require('fastify')
const {itemRoutes} = require('./route/item')
const app = fastify({logger:true})
const port = 3000

app.register(itemRoutes)

const start = async () => {
  try {
    await app.listen({port})
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()