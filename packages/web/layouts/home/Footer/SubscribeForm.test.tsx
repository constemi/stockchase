import '@testing-library/jest-dom'
import * as React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { SubscribeForm } from './SubscribeForm'

test('Form can be rendered & submitted & input field is modifiable', async () => {
  const mockSubmit = jest.fn()
  const { queryByText, getByTestId } = render(<SubscribeForm handleSubmit={mockSubmit} />)

  expect(queryByText('Subscribe')).not.toBeNull()

  fireEvent.change(getByTestId('input'), { target: { value: 'test@email.com' } })
  fireEvent.submit(getByTestId('form'))

  expect(mockSubmit).toHaveBeenCalled()
})
