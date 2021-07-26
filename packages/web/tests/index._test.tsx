import '@testing-library/jest-dom'
import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { MeFragmentDoc } from 'lib/graphql'
import { GraphQLError } from 'graphql'
import Index from '../pages/index'

afterEach(cleanup)

const mocks = [
  {
    request: {
      query: MeFragmentDoc,
      variables: {
        token: 'testUserToken...',
      },
    },
    result: {
      data: {
        id: '1',
        firstName: 'TestUserFirstName',
        lastName: 'TestUserLastName',
        fullName: 'TestUserFirstLastName',
        email: 'TestUserEmail',
      },
      errors: [new GraphQLError('Error!')],
    },
  },
]

test('renders the correct content', () => {
  const { getAllByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Index />
    </MockedProvider>,
  )

  expect(getAllByText('StockChase')).toHaveLength(7)
})
