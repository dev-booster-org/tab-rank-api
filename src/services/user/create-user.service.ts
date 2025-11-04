import { UserRepository } from '@repositories/user.repository'

type IRequest = {
  nickName: string
  email: string
  password: string
}

export class CreateUserService {
  private readonly userRepository = new UserRepository()

  async execute({ nickName, email, password }: IRequest) {
    const userWithSameEmail = await this.userRepository.findByEmail({ email })

    if (userWithSameEmail) {
      throw new Error('Email already in use')
    }

    const userWithSameNickName = await this.userRepository.findByNickName({
      nickName,
    })

    if (userWithSameNickName) {
      throw new Error('NickName already in use')
    }

    return this.userRepository.create({ nickName, email, password })
  }
}
