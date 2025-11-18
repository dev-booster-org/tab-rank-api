import { Repository } from 'typeorm'

import { Lobby } from '@entities/lobby.entity'
import AppDataSource from '@database/typeorm-datasource'

import {
  CreateProps,
  CreateResponse,
  DisableLobbyProps,
  DisableLobbyResponse,
  GetActiveLobbyByUserIdProps,
  GetActiveLobbyByUserResponse,
  GetLobbyByIdProps,
  GetLobbyByIdResponse,
  GetLobbyByJoinCodeProps,
  GetLobbyByJoinCodeResponse,
  JoinProps,
  JoinResponse,
  LeaveLobbyProps,
  LeaveLobbyResponse,
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
      relations: ['host', 'game', 'players', 'matches'],
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

  async getById({ id }: GetLobbyByIdProps): Promise<GetLobbyByIdResponse> {
    const lobby = await this.lobbyRepository
      .createQueryBuilder('lobby')
      .leftJoinAndSelect('lobby.host', 'host')
      .leftJoinAndSelect('lobby.game', 'game')
      .leftJoinAndSelect('lobby.players', 'players')

      .leftJoinAndSelect('lobby.matches', 'matches')
      .leftJoinAndSelect('matches.players', 'matchPlayers')
      .leftJoinAndSelect('matches.winner', 'winner')

      .where('lobby.id = :id', { id })

      .getOne()

    return lobby
  }

  async getByJoinCode({
    joinCode,
  }: GetLobbyByJoinCodeProps): Promise<GetLobbyByJoinCodeResponse> {
    const lobby = await this.lobbyRepository.findOne({
      where: { joinCode },
      relations: ['host', 'game', 'players', 'matches'],
    })

    return lobby
  }

  async disable({ id }: DisableLobbyProps): Promise<DisableLobbyResponse> {
    const lobby = await this.lobbyRepository.findOne({
      where: { id },
    })

    if (!lobby) throw new Error('Lobby not found')

    lobby.isActive = false

    await this.lobbyRepository.save(lobby)

    return lobby
  }

  async getActiveLobbyByUserId({
    userId,
  }: GetActiveLobbyByUserIdProps): Promise<GetActiveLobbyByUserResponse> {
    const lobby = await this.lobbyRepository.findOne({
      where: { host: { id: userId }, isActive: true },
      relations: ['players', 'host'],
    })

    return lobby
  }

  async leaveLobbyAsPlayer({
    userId,
    lobbyId,
  }: LeaveLobbyProps): Promise<LeaveLobbyResponse> {
    const lobby = await this.lobbyRepository.findOne({
      where: { id: lobbyId },
      relations: ['players'],
    })

    if (!lobby) throw new Error('Lobby not found')

    await this.lobbyRepository
      .createQueryBuilder()
      .relation(Lobby, 'players')
      .of(lobbyId)
      .remove(userId)

    const updatedLobby = await this.lobbyRepository.findOne({
      where: { id: lobbyId },
      relations: ['players'],
    })

    return updatedLobby!
  }

  async leaveLobbyAsHost({
    lobbyId,
  }: LeaveLobbyProps): Promise<LeaveLobbyResponse> {
    const lobby = await this.lobbyRepository.findOne({
      where: { id: lobbyId },
      relations: ['players', 'host'],
    })

    if (!lobby) throw new Error('Lobby not found')

    if (lobby.players.length === 0) {
      lobby.isActive = false
      await this.lobbyRepository.save(lobby)
      return lobby
    }

    const newHost = lobby.players[0]
    lobby.host = newHost

    lobby.players = lobby.players.filter((player) => player.id !== newHost.id)

    await this.lobbyRepository.save(lobby)

    return lobby
  }
}
