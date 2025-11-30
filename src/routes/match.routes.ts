import { Router } from 'express'

import { MatchController } from '@controllers/match.controller'
import { ensureAuthenticatedMiddleware } from '@/shared/middlewares/ensure-authenticated.middleware'

const matchController = new MatchController()

export const matchRoutes = Router()

matchRoutes.post(
  '/create',
  ensureAuthenticatedMiddleware,
  matchController.create,
)

matchRoutes.get(
  '/:userId/get-by-user-id',
  ensureAuthenticatedMiddleware,
  matchController.getByUserId,
)
