require('dotenv').config()
const express = require('express')
const session = require('express-session')
const passport = require('passport')

require('./config/passport')
const prisma = require('./config/prisma')
const { PrismaSessionStore } = require('@quixo3/prisma-session-store')

// Security
const helmet = require('helmet')
const cors = require('cors')

// Front routes
const authRouter = require('./router/auth.js')

const app = express()

const port = process.env.PORT || 4000

// Application middleware
app.use(helmet())
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
)

// Convert json to object
// parse application/json, basically parse incoming Request Object as a JSON Object
// [ ] Throw error to front if too big
app.use(express.json({ limit: '20mb' }))
app.use(
  express.urlencoded({
    extended: true,
  })
)

/* Those lines must come after the router
https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

1 - session middleware creates session (using data from the sessionStore or PrismaSessionStore).
2 - passport.initialize assigns _passport object to request object, checks if there's a session object, 
and if it exists, and field passport exists in it (if not - creates one), assigns that object to session field in _passport
3 - passport.session looks for user field in req._passport.session, and if finds one, passes it to deserializeUser function and calls it. 
deserializeUser function assigns req._passport.session.user to user field of request object (if find one in req._passport.session.user). 

1 - app.use(session())
2 - app.use(passport.initialize())
3 - app.use(passport.session())

*/
// Express session
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
)

app.use(passport.initialize())
// app.use(passport.session())
app.use(passport.authenticate('session'))

// For development purpose:
app.use((req, res, next) => {
  console.log(req.session)
  console.log(req.user)
  next()
})

// Client Routes
const apiRoute = '/api/v1'
app.use(apiRoute, authRouter)

// Statics files routes for pictures saved locally
// const dirname = path.resolve()

// Handle 404
app.get('*', function (req, res, next) {
  let error = new Error(`${req.ip} tried to reach ${req.originalUrl}`) // Tells us which IP tried to reach a particular URL
  error.statusCode = 404
  next(error)
})

// Error handling middleware
// https://gist.github.com/zcaceres/2854ef613751563a3b506fabce4501fd
// Global error middleware, always keep it last
app.use(function (error, req, res, next) {
  console.error(error.message, '<= printed from api.js') // Log error message in our server's console
  if (!error.statusCode) error.statusCode = 500 // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(error.statusCode).send(error.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
})

app.listen(port, () => {
  console.log('Server is up on ' + port)
})
