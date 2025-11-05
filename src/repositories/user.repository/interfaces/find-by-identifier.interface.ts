import { User } from '@entities/user.entity'

export interface FindByIdentifierProps {
  identifier: string
}

export type FindByIdentifierResponse = User | null
