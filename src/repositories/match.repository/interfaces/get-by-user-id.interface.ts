import Match from '@entities/match.entity'

export interface GetByUserIdProps {
  userId: string
  page?: number
  limit?: number
}

export interface GetByUserIdResponse {
  totalCount: number
  matches: Match[]
}
