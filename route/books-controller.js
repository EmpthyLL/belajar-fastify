const getBooksOpts = {
    schema:{
        response:{
            200:{
                type:'array',
                items:{
                    type:'object',
                    properties:{
                        id:{type:'integer'},
                        title:{type:'string'},
                        author:{type:'string'},
                    }
                }
            }
        }
    }
}
const postBooksOpts = {
    schema:{
        body:{
            type:'object',
            properties:{
                id:{type:'integer'},
                title:{type:'string'},
                author:{type:'string'},
            },
            required:['id','title']
        },
        response:{
            200:{
                type:'array',
                items:{
                    type:'object',
                    properties:{
                        id:{type:'integer'},
                        title:{type:'string'},
                        author:{type:'string'},
                    }
                }
            }
        }
    }
}
const updateBooksOpts = {
    schema:{
        body:{
            type:'object',
            properties:{
                title:{type:'string'},
                author:{type:'string'},
            },
        },
        response:{
            200:{
                type:'array',
                items:{
                    type:'object',
                    properties:{
                        id:{type:'integer'},
                        title:{type:'string'},
                        author:{type:'string'},
                    }
                }
            }
        }
    }
}

function bookController(app, options, done){
    app.get('/', getBooksOpts, async (req, res) => {
        try {
            const [books] = await app.mysql.execute("SELECT * FROM books")
            res.send(books)
        } catch (error) {
            if(error){
                res.status(400).send({
                    message:error.message
                })
            }
        }
    })
    app.get('/:id', getBooksOpts, async (req, res) => {
        const key = req.params.id
        try {
            const [books] = await app.mysql.execute("SELECT * FROM books WHERE id = (?)", [key])
            res.send(books)
        } catch (error) {
            if(error){
                res.status(400).send({
                    message:error.message
                })
            }
        }
    })
    app.post('/', postBooksOpts, async (req, res) => {
        const {id,title,author} = req.body
        try {
            await app.mysql.execute('INSERT INTO books VALUES (?, ?, ?)', [id, title, author?author:null]);
            const [books] = await app.mysql.execute("SELECT * FROM books");
            res.send(books);
        } catch (error) {
            if(error){
                res.status(400).send({
                    message:error.message
                })
            }
        }
    })
    app.put('/:id', updateBooksOpts, async (req, res) => {
        const key = req.params.id
        const { title, author } = req.body;
        
        const updates = []
        if (title) updates.push(`title = '${title}'`)
        if (author) updates.push(`author = '${author}'`)
        try {
            if(updates.length > 0){
                await app.mysql.execute(`UPDATE books SET ${updates.join(',')} WHERE id = (?)`, [key]);
            }
            const [books] = await app.mysql.execute("SELECT * FROM books");
            res.send(books);
        } catch (error) {
            if(error){
                res.status(400).send({
                    message:error.message
                })
            }
        }
    })
    app.delete('/:id', getBooksOpts, async (req, res) => {
        const key = req.params.id
        try {
            await app.mysql.execute(`DELETE FROM books WHERE id = (?)`, [key]);
            const [books] = await app.mysql.execute("SELECT * FROM books");
            res.send(books);
        } catch (error) {
            if(error){
                res.status(400).send({
                    message:error.message
                })
            }
        }
    })
    done()
}

module.exports = {
    bookController
}