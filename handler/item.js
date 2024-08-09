const { v4 } = require('uuid')
let {items} = require('../item')

function getItems(req, res){
    res.send(items)
}
function getItem(req, res){
    const key = req.params.id
    res.send(items.find(item => item.id.toString() === key))
}
function addItem(req, res){
    const {name} = req.body
    const item = {
        id:v4(),
        name
    }
    items = [...items,item]
    res.code(201).send(items)
}
function removeItem(req, res){
    const key = req.params.id
    items = items.filter(item => item.id.toString() !== key)
    res.code(200).send(items)
}
function updateItem(req, res){
    const key = req.params.id
    const {name} = req.body
    items = items.map(item => item.id.toString() === key ? {...item, name} : item)
    res.code(200).send(items)
}

module.exports = {getItems, getItem, addItem, removeItem, updateItem}