import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

function bootstrap () {
  const app = express()
  app.set('port', process.env.PORT || 8080)

  // Middlewares
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

  app.get('/', (req, res) => {
    res.status(200).json({users: []})
  })

  // Application listening
  app.listen(app.get('port'), () => {
    console.log('Application running on http://localhost:' + app.get('port'))
  })

  return app
}

export default bootstrap()
