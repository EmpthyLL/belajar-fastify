const fastify = require('fastify')
const mysql = require('@fastify/mysql')
const {bookController} = require('./books-controller')
const {itemRoutes} = require('./route/item')
const app = fastify({logger:true})
const port = 3000

app.register(mysql,{
  host:'localhost',
  user:'root',
  password:'k@k1KUk0kK4KU',
  database:'bookstore',
  promise: true
})

app.register(bookController,{prefix: '/books'})
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