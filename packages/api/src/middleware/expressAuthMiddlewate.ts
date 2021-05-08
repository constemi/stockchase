import { Request, Response } from 'express'
import { UnauthorizedError, ForbiddenError } from 'routing-controllers'
import { User } from '../modules/user/user.entity'

export interface ExpressRequest extends Request {
  user?: { id: string }
}

export function AuthMiddleware(req: ExpressRequest, response: Response, next: (err?: any) => any): any {
  if (req?.user?.id) {
    const currentUser = User.createQueryBuilder().where({ id: req.user.id }).getOne()
    if (currentUser) return next()
    response.json(new UnauthorizedError('Not authorized'))
  } else {
    response.json(new ForbiddenError('Not authenticated'))
  }
  next()
}
