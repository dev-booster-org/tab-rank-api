import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import jsonweb from 'jsonwebtoken'

import { UserRepository } from '@repositories/user.repository'
import { AppError } from '@shared/errors/app-error'

type IRequest = {
  identifier: string
  password: string
}

@injectable()
export class SignInService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async execute({ identifier, password }: IRequest) {
    const user = await this.userRepository.findByIdentifier({ identifier })

    if (!user) {
      throw new AppError('Credenciais inválidas', 401)
    }

    const passwordMatches = await compare(password, user.password)

    if (!passwordMatches) {
      throw new AppError('Credenciais inválidas', 401)
    }

    const accessToken = jsonweb.sign(
      {
        id: user.id,
        nickName: user.nickName,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        subject: user.id,
        expiresIn: '7d',
      },
    )

    return {
      accessToken,
      user: {
        id: user.id,
        nickName: user.nickName,
        email: user.email,
      },
    }
  }
}
