import { UserInputError } from 'apollo-server-express'
import { Service, Inject } from 'typedi'
import argon2 from 'argon2'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import { createOtpToken } from '../../lib/otp'
import { createAuthToken } from '../../lib/jwt'
import { CreateInput } from './inputs/create.input'
import { RegisterInput } from './inputs/register.input'

@Service()
export class UserService {
  @Inject(() => UserRepository)
  userRepository: UserRepository

  async login(data: { email: string; password: string }): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email)
    if (!user) throw new UserInputError('Incorrect email or password')
    if (!user.password) throw new UserInputError('Account not set up')
    const isValidPassword = await argon2.verify(user.password, data.password)
    if (!isValidPassword) throw new UserInputError('Incorrect email or password')
    return user
  }

  async create(data: RegisterInput) {
    const email = data.email.toLowerCase().trim()
    await this.checkUserExists({ email })
    const user = await User.create(data).save()
    return user
  }

  async createPartial(data: CreateInput) {
    const email = data.email.toLowerCase().trim()
    await this.checkUserExists({ email })
    const user = await User.create(data).save()
    return user
  }

  async update(userId: string, data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findById(userId)
    if (data.email && data.email.trim().toLowerCase() !== user.email) {
      await this.checkUserEmailExists(data.email)
    }
    return user.update(data)
  }

  async destroy(userId: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId)
    return user.destroy()
  }

  createAuthToken(user: User): string {
    return createAuthToken({ id: user.id })
  }

  createOtpToken(user: Partial<User>): string {
    return createOtpToken({ email: user.email })
  }

  async checkUserExists(field: Partial<User>) {
    const user = await User.find({ where: field })
    if (user.length > 0) {
      throw new UserInputError('User with these details already exists')
    }
  }

  async checkUserEmailExists(email: string) {
    const userExists = await this.userRepository.findByEmail(email)
    if (userExists) throw new UserInputError('User with this email already exists')
  }
}
