import { UserInputError } from "apollo-server-express"
import { Service } from "typedi"
import { FindOneOptions, FindManyOptions } from "typeorm"

import { User } from "./user.entity"

@Service()
export class UserRepository {
  findAll(options?: FindManyOptions<User>) {
    return User.find(options)
  }
  async findById(userId: string, options?: FindOneOptions<User>): Promise<User> {
    try {
      return await User.findOneOrFail(userId, options)
    } catch {
      throw new UserInputError("User not found")
    }
  }

  findByEmail(email: string): Promise<User | undefined> {
    const lowerEmail = email.trim().toLowerCase()
    const where: any = { email: lowerEmail }
    return User.findOne({ where })
  }
}
