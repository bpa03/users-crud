import User from '../sequelize/models/user'

// Repositories
import UserRepository from './user-repository'

export const userRepository = new UserRepository(User)
