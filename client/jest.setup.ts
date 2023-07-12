import '@testing-library/jest-dom/extend-expect'
import {loadEnvConfig} from '@next/env'
import {server} from './mocks/server'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
