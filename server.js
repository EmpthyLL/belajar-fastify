const appConfig = require('./config/app')
const DBConfig = require('./config/database')

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
const app = fastify({logger:logger[appConfig.appMode]})
const port = appConfig.appPort


app.register(mysql,{
  host:DBConfig.connection.host,
  port:DBConfig.port,
  user:DBConfig.connection.user,
  password:DBConfig.connection.password,
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