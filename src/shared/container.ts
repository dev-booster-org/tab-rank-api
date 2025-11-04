import { container } from 'tsyringe'

import { UserRepository } from '@repositories/user.repository'
import { GameRepository } from '@repositories/game.repository'

container.registerSingleton<UserRepository>('UserRepository', UserRepository)
container.registerSingleton<GameRepository>('GameRepository', GameRepository)
