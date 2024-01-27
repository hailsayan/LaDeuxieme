const express = require ('express')
const morgan = require ('morgan')
const mongoose = require ('mongoose')
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express()

// connect to MongoDB
const dbURI = 'mongodb+srv://Psyon:show@cluster0.f3edujc.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbURI)
    .then((result)=> app.listen(3000))
    .catch((err)=>console.log(err,'notConnected'))

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'))
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended:true }))

// routes
app.get('/', (req, res)=>{
    res.redirect('/blogs')
})

app.get('/about', (req, res)=>{
    res.render('about', {title: 'info'})
})
// blog routes
app.use('/blogs',blogRoutes)


// 404 page
app.use((req, res)=>{
    res.status(404).render('404', {title: '404'});
})