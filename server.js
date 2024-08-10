const config = require('./config/app')

const logger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

const fastify = require('fastify')
const mysql = require('@fastify/mysql')
const {bookController} = require('./route/books-controller')
const {itemRoutes} = require('./route/item-controller')
const {userManager} = require('./route/user-controller')
const app = fastify({logger:logger[config.appMode]})
const port = config.appPort

// app.register(mysql,{
//   host:'localhost',
//   port:3307,
//   user:'root',
//   password:'LU0l#angKUL4NGajarYA',
//   database:'bookstore',
//   promise: true
// })
app.register(mysql,{
  host:'localhost',
  user:'root',
  password:'k@k1KUk0kK4KU',
  database:'bookstore',
  promise: true
})

app.register(bookController,{prefix: '/books'})
app.register(itemRoutes, {prefix:'/items'})
app.register(userManager, {prefix:'/users'})

app.get('/', (req,res) => {
  res.send({
      Ganja:'Sehat!'
  })
})

const start = async () => {
  try {
    await app.listen({port})
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()