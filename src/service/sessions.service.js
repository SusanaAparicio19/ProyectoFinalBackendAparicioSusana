import { hasheadasSonIguales } from '../utils/cripto.js'
import { userRepository } from '../repository/user.repository.js'

export class SessionsService {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  async authenticate({ username, password }) {
    let user
    try {
      user = await this.userRepository.findOne({ username })
    } catch (error) {
      throw new Error('authentication error')
    }

    if (!hasheadasSonIguales({
      recibida: password,
      almacenada: user.password
    })) {
      throw new Error('authentication error')
    }

    return user.toPOJO()
  }
}

export const sessionsService = new SessionsService({ userRepository })