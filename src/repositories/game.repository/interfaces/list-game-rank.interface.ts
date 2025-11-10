export interface ListGameRankResponse {
  id: string
  name: string
  winner: {
    id: string
    nickName: string
    victoriesCount: number
  }
}
