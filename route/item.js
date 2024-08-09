const {getItems, getItem, addItem, removeItem, updateItem} = require('../controllers/item')

const item = {
    type: 'object',
    properties: {
        id:{type:'string'},
        name:{type:'string'},
    }
}

const getItemsOpts = {
    schema: {
        response:{
            200:{
                type: 'array',
                items:item
            }
        }
    }
}

const getItemOpts = {
    schema: {
        response:{
            200:item,
        }
    }
}

const postItemOpts = {
    schema: {
        body:{
            type: 'object',
            required: ['name'],
            properties:{
                name:{type:'string'}
            }
        },
        response:{
            201:{
                type: 'array',
                items:item
            }
        }
    }
}

// const deleteItemOpts = {
//     schema: {
//         body:{
//             type: 'object',
//             required: ['name'],
//             properties:{
//                 name:{type:'string'}
//             }
//         },
//         response:{
//             200:{
//                 type: 'array',
//                 items:item
//             }
//         }
//     }
// }

function itemRoutes(app, options, done){
    app.get('/', (req,res) => {
        res.send({
            Ganja:'Sehat!'
        })
    })
    app.get('/item',getItemsOpts, (req,res) => {
        getItems(req,res)
    })
    app.get('/item/:id',getItemOpts, (req,res) => {
        getItem(req,res)
    })
    app.post('/item', postItemOpts,(req, res) => {
        addItem(req, res)
    })
    app.delete('/item/:id', getItemsOpts,(req, res) => {
        removeItem(req, res)
    })
    app.put('/item/:id', getItemsOpts,(req, res) => {
        updateItem(req, res)
    })
    done()
}

module.exports = {itemRoutes}