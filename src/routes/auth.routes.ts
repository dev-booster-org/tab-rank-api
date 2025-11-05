import { AuthController } from '@/controllers/auth.controller'
import { Router } from 'express'

const authController = new AuthController()

export const authRoutes = Router()

authRoutes.post('/sign-in', authController.signIn)
