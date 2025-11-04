/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository } from 'typeorm'

import AppDataSource from '@database/typeorm-datasource'
import { User } from '@entities/user.entity'

import {
  CreateProps,
  CreateResponse,
  FindByEmailProps,
  FindByEmailResponse,
  FindByNickNameProps,
  FindByNickNameResponse,
} from './interfaces'

export class UserRepository {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User)

  async create({
    email,
    nickName,
    password,
  }: CreateProps): Promise<CreateResponse> {
    const user = this.userRepository.create({
      email,
      nickName,
      password,
    })

    const { password: _, ...rest } = await this.userRepository.save(user)

    return rest
  }

  async findByEmail({ email }: FindByEmailProps): Promise<FindByEmailResponse> {
    const user = await this.userRepository.findOne({ where: { email } })

    if (!user) return Promise.resolve(null)

    const { password: _, ...rest } = user

    return rest
  }

  async findByNickName({
    nickName,
  }: FindByNickNameProps): Promise<FindByNickNameResponse> {
    const user = await this.userRepository.findOne({ where: { nickName } })

    if (!user) return Promise.resolve(null)

    const { password: _, ...rest } = user

    return rest
  }
}
