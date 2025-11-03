import { User } from '@entities/user.entity'

export interface CreateProps {
  nickName: string
  email: string
  password: string
}

export type CreateResponse = Omit<User, 'password'>
