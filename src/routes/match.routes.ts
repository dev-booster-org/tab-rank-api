import { Router } from 'express'

import { MatchController } from '@controllers/match.controller'

const matchController = new MatchController()

export const matchRoutes = Router()

matchRoutes.post('/', matchController.create)
