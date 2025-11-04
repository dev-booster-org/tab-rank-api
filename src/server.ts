import 'reflect-metadata'
import 'dotenv/config'
import '@shared/container'

import express from 'express'

import { routes } from '@routes/index'
import AppDataSource from './database/typeorm-datasource'

const app = express()

app.use(express.json())

app.use('/api', routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log('📦 - Database connected')
    })
    .catch((error) => {
      console.log('❌ - Error connecting to database', error)
    })

  console.log(`⚡ - Server is running on port ${PORT}`)
})
