require('dotenv').config()

const alias = {
    development:"development",
    dev:'development',
    test:'test',
    production:'production',
    prod:'production'
}

module.exports = {
    appMode:alias[process.env.NODE_ENV] || 'dev',
    appHost:alias[process.env.APP_HOST] || 'localhost',
    appPort:alias[process.env.APP_PORT] || 3000,
}