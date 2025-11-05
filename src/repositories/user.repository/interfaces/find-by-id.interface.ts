import { User } from '@entities/user.entity'

export interface FindByIdProps {
  id: string
}

export type FindByIdResponse = User | null
