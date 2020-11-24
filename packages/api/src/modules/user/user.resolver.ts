import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql"

import { Inject } from "typedi"

import { decryptToken, createToken } from "../../lib/jwt"
import { AuthMiddleware } from "../../lib/authMiddleware"
import { User } from "./user.entity"
import { UserService } from "./user.service"
import { UserMailer } from "./user.mailer"
import { UpdateUserInput } from "./inputs/updateUser.input"
import { ResetPasswordInput } from "./inputs/resetPassword.input"
import { UserRepository } from "./user.repository"
import { CurrentUser } from "../shared/context/currentUser"
import { ContextUser } from "../shared/context/contextUser"
import { AuthResponse } from "./responses/auth.response"
import { LoginInput } from "./inputs/login.input"
import { ResolverContext } from "../shared/context/resolver"

import { RegisterInput } from "./inputs/register.input"

@Resolver(() => User)
export class UserResolver {
  @Inject(() => UserService)
  userService: UserService
  @Inject(() => UserMailer)
  userMailer: UserMailer
  @Inject(() => UserRepository)
  userRepo: UserRepository

  // LOGIN
  @Mutation(() => AuthResponse)
  async login(@Arg("data") data: LoginInput, @Ctx() context: ResolverContext): Promise<AuthResponse> {
    const user = await this.userService.login(data)
    const token = this.userService.createAuthToken(user)
    context.req.user = user
    return { user, token }
  }

  // REGISTER
  @Mutation(() => AuthResponse)
  async register(@Arg("data") data: RegisterInput, @Ctx() context: ResolverContext): Promise<AuthResponse> {
    const user = await this.userService.create(data)
    const token = this.userService.createAuthToken(user)
    context.req.user = user
    return { user, token }
  }

  // ME
  @Query(() => User, { nullable: true })
  me(@ContextUser() user: ContextUser): User | null {
    return user
  }

  // UPDATE ME
  @AuthMiddleware()
  @Mutation(() => User)
  updateMe(@CurrentUser() currentUser: User, @Arg("data") data: UpdateUserInput): Promise<User> {
    return this.userService.update(currentUser.id, data)
  }

  // LOGOUT
  @AuthMiddleware()
  @Mutation(() => Boolean)
  logout(): boolean {
    return true
  }

  // FORGOT PASSWORD
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await this.userRepo.findByEmail(email)
    if (user) {
      const token = createToken({ id: user.id })
      this.userMailer.sendResetPasswordLink(user, token)
    }
    return true
  }

  // RESET PASSWORD
  @Mutation(() => Boolean)
  async resetPassword(@Arg("data") data: ResetPasswordInput): Promise<boolean> {
    try {
      const payload = decryptToken<{ id: string }>(data.token)
      const user = await this.userService.update(payload.id, {
        password: data.password,
      })
      this.userMailer.sendPasswordChanged(user)
      return true
    } catch (error) {
      return false
    }
  }

  // FIELD RESOLVERS
}
