require('dotenv').config()

async function auth(req, res){
    const apiKey = req.headers('x-api-key')
    const knownKey = process.env.APIKEY
    if(!apiKey || apiKey !== knownKey){
        res.status(404).send({
            message:'Not Authorized'
        })
    }
}
module.exports = auth