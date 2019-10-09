const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./mocks/data.json')
const middlewares = jsonServer.defaults()

server.use(jsonServer.rewriter({
  "/domain/xn--f6q70qepc5a.test": "/xn--f6q70qepc5a",
  "/domain/example-dnssec.test": "/example-dnssec"
}))

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.url === '/domain/xn--f6q70qepc5a') {
    req.url = "xn--f6q70qepc5a";
  } else if (req.url === '/domain/proor.test') {
    req.url = '/proor';
  } else if (req.url === '/ext/domain/com') {
    req.url = '/com';
  } else if (req.url === '/example-dnssec') {
    req.url = '/example-dnssec';
  }
  next()
})

server.get('/domain/xn--f6q70qepc5a.test', (req, res) => {
  res.jsonp(req.query)
})

server.get('/proor.test', (req, res) => {
  res.jsonp(req.query)
})

server.get('/domain/example-dnssec.test', (req, res) => {
  res.jsonp(req.query)
})

// Use default router
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})