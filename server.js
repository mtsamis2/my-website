const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  const path = require('path');
  const options = {
    root: path.join(__dirname, '/static'),
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    }
  };
  server.get('/sitemap.xml', (req, res) => (
    res.status(200).sendFile('sitemap.xml', options)
  ));


  server.get('/robots.txt', (req, res) => (
    res.status(200).sendFile('robots.txt', options)
  ));

  server.get('/ads.txt', (req, res) => (
    res.status(200).sendFile('ads.txt', options)
  ));

  server.get('/posts/:id/:slug', (req, res) => {
    const actualPage = '/posts'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/pages/:page', (req, res) => {
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