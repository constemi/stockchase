import '@testing-library/jest-dom'
import * as React from 'react'
import { render } from '@testing-library/react'
import { LinkGroup } from './LinkGroup'

test('renders the correct link group content', async () => {
  const { getByText } = render(
    <LinkGroup
      data={{
        title: 'testTitle',
        links: [
          {
            label: 'testLabel',
            href: '/testUrl',
            badge: undefined,
          },
        ],
      }}
    ></LinkGroup>,
  )

  getByText('testTitle')
  getByText('testLabel')
  expect(getByText('testLabel')).toContainHTML('<a href="/testUrl"')
})
