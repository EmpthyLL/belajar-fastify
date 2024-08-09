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

function bookController(app, options, done){
    app.get('/', getBooksOpts, async (req, res) => {
        try {
            const [books] = await app.mysql.execute("SELECT * FROM books")
            res.send(books)
        } catch (error) {
            res.send(error.response)
        }
    })
    app.post('/', postBooksOpts, async (req, res) => {
        const {id,title,author} = req.body
        try {
            await app.mysql.execute('INSERT INTO books (id, title, author) VALUES (?, ?, ?)', [id, title, author?author:null]);
            const [books] = await app.mysql.execute("SELECT * FROM books");
            res.send(books);
        } catch (error) {
            res.send(error.response)
        }
    })
    done()
}

module.exports = {
    bookController
}