export interface ListGameRankByUserProps {
  userId: string
}

export interface ListGameRankByUserResponse {
  game: {
    id: string
    name: string
  }
  victoriesCount: number
  matchesCount: number
}
