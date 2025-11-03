import { User } from '@entities/user.entity'

export interface FindByEmailProps {
  email: string
}

export type FindByEmailResponse = Omit<User, 'password'> | null
