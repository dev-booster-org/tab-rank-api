import { Router } from 'express'

import { MatchController } from '@controllers/match.controller'
import { ensureAuthenticatedMiddleware } from '@/shared/middlewares/ensure-authenticated.middleware'

const matchController = new MatchController()

export const matchRoutes = Router()

matchRoutes.post('/', ensureAuthenticatedMiddleware, matchController.create)
