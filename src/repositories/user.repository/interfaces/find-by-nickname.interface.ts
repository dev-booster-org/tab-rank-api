import { User } from '@entities/user.entity'

export interface FindByNickNameProps {
  nickName: string
}

export type FindByNickNameResponse = Omit<User, 'password'> | null
