const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.set('views', './views')
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/my-blog')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

let Post = require('./post-model')

app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err)
      throw err

    res.render('index', { posts: posts })
  })
})

app.get('/post', (req, res) => {
  res.redirect('/')
})

app.get('/post/novo', (req, res) => {
  res.render('formulario')
})

app.post('/post/novo', (req, res) => {
  let novoPost = Post({
    publishedAt: new Date().toISOString(),
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  })

  novoPost.save((err) => {
    if (err)
      throw err
  })

  res.redirect('/')
})

app.get('/post/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err)
      throw err

    res.render('formulario', { post: post })
  })
})

app.post('/post/:id', (req, res) => {
  let postAtualizado = {
    updatedAt: new Date().toISOString(),
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  }

  Post.findByIdAndUpdate(req.params.id, postAtualizado, (err, post) => {
    if (err)
      throw err
  })

  res.redirect('/')
})

app.delete('/post/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err)
      throw err
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
