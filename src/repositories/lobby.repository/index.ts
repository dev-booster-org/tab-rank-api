import { Repository } from 'typeorm'

import { Lobby } from '@entities/lobby.entity'
import AppDataSource from '@database/typeorm-datasource'

import {
  CreateProps,
  CreateResponse,
  JoinProps,
  JoinResponse,
} from './interfaces'

export class LobbyRepository {
  private readonly lobbyRepository: Repository<Lobby> =
    AppDataSource.getRepository(Lobby)

  async create({
    gameId,
    hostId,
    isActive,
    joinCode,
  }: CreateProps): Promise<CreateResponse> {
    const createdLobby = this.lobbyRepository.create({
      game: { id: gameId },
      host: { id: hostId },
      isActive,
      joinCode,
    })

    await this.lobbyRepository.save(createdLobby)

    return createdLobby
  }

  async join({ lobbyId, userId }: JoinProps): Promise<JoinResponse> {
    const lobby = await this.lobbyRepository.findOne({
      where: { id: lobbyId },
      relations: ['players'],
    })

    if (!lobby) throw new Error('Lobby not found')

    const alreadyJoined = lobby.players.some((player) => player.id === userId)

    if (alreadyJoined) {
      return lobby
    }

    await this.lobbyRepository
      .createQueryBuilder()
      .relation(Lobby, 'players')
      .of(lobbyId)
      .add(userId)

    const updatedLobby = await this.lobbyRepository.findOne({
      where: { id: lobbyId },
      relations: ['players'],
    })

    return updatedLobby!
  }
}
