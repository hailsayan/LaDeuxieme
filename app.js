const express = require ('express')
const morgan = require ('morgan')
const mongoose = require ('mongoose')
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express()

// register view engine
app.set('view engine', 'ejs')
// app.set('views', 'viewer')

// listen for request
// app.listen(3000)

// connect to MongoDB
const dbURI = 'mongodb+srv://Psyon:show@cluster0.f3edujc.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbURI)
    .then((result)=> app.listen(3000))
    .catch((err)=>console.log(err,'notConnected'))

// middleware and static files
app.use(express.static('public'))
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended:true }))

// routes
// adding blog
app.get('/add-blog', (req,res)=> {
    const blog = new Blog({
        title : 'new blog4',
        snippet : 'about my new blog4',
        body : 'lorem ipsum passegiato docci numeno allo dora'
    })
    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
})
// getting all blogs
app.get('/all-blogs', (req,res)=> {
    Blog.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
})
// getting single blog
app.get('/single-blog', (req,res)=> {
    Blog.findById('658af4ba6f66a2752761bd56')
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
})

// deleting single blog
app.get('/d-single-blog', (req,res)=> {
    Blog.findByIdAndDelete('658afb51b15b89d00c972557')
        .then((result) => {
            if(result){
                res.send(`Document Deleted: ${result}`)
            }else{
                res.send(`Document not found`)
            }
        })
        .catch((err) => console.log(err))
})

// deleting all blogs
app.get('/d-all-blogs', (req,res)=> {
    Blog.deleteMany({})
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
})

// app.use((req, res, next)=>{
//     console.log('new request was made:');
//     console.log('Host:',req.hostname);
//     console.log('Path:',req.path);
//     console.log('Method:',req.method);
//     next()
// })

app.get('/', (req, res)=>{
    res.redirect('/blogs')
})
// app.use((req, res, next)=>{
//     console.log('---------------------')
//     next()
// })
app.get('/about', (req, res)=>{
    res.render('about', {title: 'info'})
})
// blog routes
app.use('/blogs',blogRoutes)


// 404 page
app.use((req, res)=>{
    res.status(404).render('404', {title: 'hashemi'})
})