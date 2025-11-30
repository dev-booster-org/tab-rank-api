import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserService } from '@services/user/create-user.service'
import { GetUserByIdService } from '@/services/user/get-user-by-id.service'

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

  async getById(request: Request, response: Response) {
    const { id } = request.query

    const getUserByIdService = container.resolve(GetUserByIdService)

    const user = await getUserByIdService.execute({
      id: String(id),
    })

    return response.status(200).json(user)
  }
}
