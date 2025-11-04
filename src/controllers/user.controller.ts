import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserService } from '@services/user/create-user.service'

export class UserController {
  async create(request: Request, response: Response) {
    const { nickName, email, password } = request.body

    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute({
      nickName,
      email,
      password,
    })

    return response.status(201).json(user)
  }
}
