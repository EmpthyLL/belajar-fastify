function userManager(app, options, done){
    app.get ('/',{},(req, res) => {
        res.send({
            message:'PERSETAN!',
        })
    })
    done()
}

module.exports = {userManager}