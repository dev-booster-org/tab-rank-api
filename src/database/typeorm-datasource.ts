import 'reflect-metadata'
import 'dotenv/config'
import * as dotenv from 'dotenv'

import typeorm from 'typeorm'

dotenv.config()

const AppDataSource = new typeorm.DataSource({
  type: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  username: process.env.PG_USER as string,
  password: process.env.PG_PASSWORD as string,
  database: process.env.PG_NAME as string,
  migrations: ['src/database/migrations/*.{ts,js}'],
  entities: ['src/entities/*.entity.{ts,js}'],
  logging: false,
  synchronize: false,
})

export default AppDataSource
