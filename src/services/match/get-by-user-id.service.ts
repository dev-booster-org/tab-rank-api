import { inject, injectable } from 'tsyringe'

import { MatchRepository } from '@/repositories/match.repository'

type IRequest = {
  userId: string
  page?: number
  limit?: number
}

@injectable()
export class GetMatchByUserIdService {
  constructor(
    @inject('MatchRepository')
    private matchRepository: MatchRepository,
  ) {}

  async execute({ userId, page = 1, limit = 10 }: IRequest) {
    const { totalCount, matches } = await this.matchRepository.getByUserId({
      userId,
      page,
      limit,
    })

    return {
      totalCount,
      matches,
    }
  }
}
