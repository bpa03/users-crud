import {Sequelize, Dialect} from 'sequelize'
import process from 'process'
import config from '../config/config.json'

export type Env = 'development' | 'production' | 'test'

function getEnvConfig (env: Env) {
  switch (env) {
    case 'development':
      return config.development
    case 'production':
      return config.production
    case 'test':
      return config.test
  }
}

const env = (process.env.NODE_ENV || 'development') as Env
const envConfig = getEnvConfig(env)

export const sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password as string, {
  dialect: envConfig.dialect as Dialect,
  port: envConfig.port,
  host: envConfig.host
})
