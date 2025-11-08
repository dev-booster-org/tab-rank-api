import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { AppError } from '@shared/errors/app-error'
import { UserRepository } from '@repositories/user.repository'

interface IPayload {
  sub: string
}

export async function ensureAuthenticatedMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as IPayload

    const usersRepository = new UserRepository()
    const user = await usersRepository.findById({ id: userId })

    if (!user) {
      throw new AppError('Sessão expirada', 401)
    }

    request.user = {
      id: user.id,
      nickName: user.nickName,
      email: user.email,
    }

    return next()
  } catch {
    throw new AppError('Token inválido', 401)
  }
}
