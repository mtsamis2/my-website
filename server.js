const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/:google305a5d42d8f1ef76', (req, res) => {
    const actualPage = '/google305a5d42d8f1ef76'
    app.render(req, res, actualPage)
  })

  server.get('/posts/:id/:slug', (req, res) => {
    const actualPage = '/posts'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/:page', (req, res) => {
    const actualPage = '/'
    const queryParams = { page: req.params.page }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT ||3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})