import { Request, Response } from 'express'

import { CreateUserService } from '@services/user/create-user.service'

export class UserController {
  private readonly createUserService = new CreateUserService()

  async create(request: Request, response: Response) {
    const { nickName, email, password } = request.body

    const user = await this.createUserService.execute({
      nickName,
      email,
      password,
    })

    return response.status(201).json(user)
  }
}
