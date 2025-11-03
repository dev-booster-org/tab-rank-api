import 'dotenv/config'
import * as dotenv from 'dotenv'
import * as path from 'path'

import { DataSource } from 'typeorm'

dotenv.config()

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  username: process.env.PG_USER as string,
  password: process.env.PG_PASSWORD as string,
  database: process.env.PG_NAME as string,
  migrations: [path.join(__dirname, './migrations/*.{ts,js}')],
  entities: [path.join(__dirname, '../entities/*.{ts,js}')],
  logging: true,
  synchronize: false,
})

export { AppDataSource }
