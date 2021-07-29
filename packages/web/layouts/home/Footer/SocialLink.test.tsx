import '@testing-library/jest-dom'
import * as React from 'react'
import { render } from '@testing-library/react'
import { SocialLink } from './SocialLink'

test('renders the correct social link content', async () => {
  const { getByText } = render(<SocialLink href="/social_url">Telegram</SocialLink>)

  getByText('Telegram')
  expect(getByText('Telegram')).toContainHTML('<a href="/social_url')
})
