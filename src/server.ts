import 'reflect-metadata'
import 'dotenv/config'
import '@shared/container'

import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'

import { routes } from '@routes/index'
import AppDataSource from '@database/typeorm-datasource'
import { AppError } from '@shared/errors/app-error'

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGINS
      ? JSON.parse(process.env.CORS_ORIGINS)
      : ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }),
)

app.use(express.json())

app.use('/api', routes)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

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
