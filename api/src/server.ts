import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import * as http from 'http'

// Routers
import usersRouter from './router/users.router'

export class Server {
  private server!: http.Server
  private express = express()

  constructor () {
    this.express = express()
    this.express.set('port', process.env.PORT || 8080)

    // Middlewares
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({extended: true}))
    if (process.env.NODE_ENV === 'development') this.express.use(morgan('dev'))

    // Routes
    this.express.use('/users', usersRouter)
  }

  get getServer (): http.Server {
    return this.server
  }

  async listen (): Promise<void> {
    return new Promise((resolve) => {
      this.server = this.express.listen(this.express.get('port'), () => {
        console.log('Application running on http://localhost:' + this.express.get('port'))
        resolve()
      })
    })
  }

  async stop (): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.server) {
        this.server.close(error => {
          if (error) {
            return reject(error)
          }
          return resolve()
        })
      }
      return resolve()
    })
  }
}
