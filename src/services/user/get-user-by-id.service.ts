/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserRepository } from '@/repositories/user.repository'
import { AppError } from '@/shared/errors/app-error'
import { inject, injectable } from 'tsyringe'

type IRequest = {
  id: string
}

@injectable()
export class GetUserByIdService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async execute({ id }: IRequest) {
    const user = await this.userRepository.findById({ id })

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const { _, ...userWithoutPassword } = user

    return userWithoutPassword
  }
}
