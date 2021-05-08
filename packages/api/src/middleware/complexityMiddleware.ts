import { GraphQLSchema } from 'graphql'
import { UserInputError } from 'apollo-server-express'
import { getComplexity, simpleEstimator, fieldExtensionsEstimator } from 'graphql-query-complexity'
import {
  GraphQLRequestContextDidResolveOperation,
  BaseContext,
  ValueOrPromise,
} from 'apollo-server-plugin-base'

export const ComplexityMiddleware = (schema: GraphQLSchema) => () => ({
  didResolveOperation(ctx: GraphQLRequestContextDidResolveOperation<BaseContext>): ValueOrPromise<void> {
    const max = 20
    const actual = getComplexity({
      schema,
      operationName: ctx.request.operationName,
      query: ctx.document,
      variables: ctx.request.variables,
      estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })],
    })
    if (actual > 20) {
      throw new UserInputError(`Query is too complex: ${actual}. Maximum allowed complexity: ${max}`)
    }
    console.log('Used query complexity points:', actual)
  },
})
