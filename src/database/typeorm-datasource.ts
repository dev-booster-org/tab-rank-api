import 'reflect-metadata'
import 'dotenv/config'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { fileURLToPath } from 'url'

import { DataSource } from 'typeorm'

dotenv.config()

// __dirname is not defined in ESM. Convert import.meta.url to a file path.
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  username: process.env.PG_USER as string,
  password: process.env.PG_PASSWORD as string,
  database: process.env.PG_NAME as string,
  migrations: [path.join(__dirname, './migrations/*.{ts,js}')],
  entities: [path.join(__dirname, '../entities/*.entity.{ts,js}')],
  logging: true,
  synchronize: false,
})

export default AppDataSource
