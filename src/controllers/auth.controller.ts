import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { SignInService } from '@services/auth/sign-in.service'

export class AuthController {
  async signIn(request: Request, response: Response) {
    const { identifier, password } = request.body

    const signInService = container.resolve(SignInService)

    const result = await signInService.execute({ identifier, password })

    return response.status(200).json(result)
  }
}
