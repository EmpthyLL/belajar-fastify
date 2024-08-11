require('dotenv').config()
const mongoose = require('mongoose')
const {User} = require('../user.model')

mongoose.connect(process.env.DB_MONGO_URI)
function userManager(app, options, done){
    app.get('/',{}, async (req, res) => {
        try {
            const users = await User.find()
            if(users.length > 0){
                res.send(users)
            }
            else{
                res.status(200).send({message:'Data still empty'});
            }
        } catch (error) {
            console.log(error.message)
        }
    })
    app.get('/:id',{}, async (req, res) => {
        const key = req.params.id
        try {
            const users = await User.findById(key)
            res.status(200).send(users);
        } catch (error) {
            if(error){
                res.status(400).send({message:'Data not founded'});
            }
        }
    })
    app.post('/',{}, async (req, res) => {
        const data = req.body
        try {
            const newUser = new User(data)
            await newUser.save()
            const users = await User.find()
            res.status(201).send(users);
        } catch (error) {
            if(error){
                res.status(400).send({message:'Data not added'});
            }
        }
    })
    app.put('/:id',{}, async (req, res) => {
        const key = req.params.id
        const update = req.body
        try {
            await User.findByIdAndUpdate(key,update)
            const users = await User.find()
            res.send(users)
        } catch (error) {
            if(error){
                res.status(400).send({message:'Data not founded'});
            }
        }
    })
    app.delete('/:id',{}, async (req, res) => {
        const key = req.params.id
        try {
            await User.findByIdAndDelete(key)
            const users = await User.find()
            res.send(users)
        } catch (error) {
            if(error){
                res.status(400).send({message:'Data not founded'});
            }
        }
    })
    done()
}

module.exports = {userManager}