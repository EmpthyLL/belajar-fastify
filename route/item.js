const {items} = require('../item')
const getItemsOpts = {
    schema: {
        response:{
            200:{
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id:{type:'integer'},
                        name:{type:'string'},
                    }
                }
            }
        }
    }
}

const getItemOpts = {
    schema: {
        response:{
            200:{
                type: 'object',
                properties: {
                    id:{type:'integer'},
                    name:{type:'string'},
                }
            }
        }
    }
}

function itemRoutes(app, options, done){

    app.get('/', (req,res) => {
        res.send({
            Ganja:'Sehat!'
        })
    })
    app.get('/item',getItemsOpts, (req,res) => {
        res.send(items)
    })
    app.get('/item/:id',getItemOpts, (req,res) => {
        const key = Number(req.params.id)
        res.send(items.find(item => item.id === key))
    })

    done()
}

module.exports = {itemRoutes}