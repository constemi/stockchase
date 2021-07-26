import '@testing-library/jest-dom'
import * as React from 'react'
import { render } from '@testing-library/react'
import { FeatureItem } from './FeatureItem'
import { FcTimeline } from 'react-icons/fc'

test('renders the correct feature item content', async () => {
  const { getByText, getByTestId } = render(
    <FeatureItem title="testTitle" icon={<FcTimeline />}>
      Test Content
    </FeatureItem>,
  )

  getByText('testTitle')
  getByText(/Test Content/i)
  expect(getByTestId(/iconContainer/i)).toContainHTML('svg')
})
