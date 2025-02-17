import React from 'react'
import { render } from '@testing-library/react'
import { EditPreviewText } from '../EditPreviewText'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'
import sample from 'lodash.sample'
import { AnimatePresence } from 'motion/react'

jest.mock('motion/react', () => {
  return {
    ...jest.requireActual('motion/react'),
    AnimatePresence: ({ children }: any) => children,
  }
})

describe('EditPreviewText', () => {
  it('displays the preview text', async () => {
    const value = faker.lorem.paragraph()
    const { getByRole } = render(<EditPreviewText value={value} onChange={jest.fn()} />)

    const input = getByRole('textbox')
    expect(input).toHaveValue(value)
  })

  it('updates the preview text', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { getByRole } = render(<EditPreviewText value="" onChange={handleChange} />)

    const input = getByRole('textbox')
    const value = sample(['a', 'b', 'c'])
    await user.type(input, value)
    expect(handleChange).toHaveBeenCalledWith(value)
  })

  it('can be read only', async () => {
    const { baseElement } = render(
      <EditPreviewText value={faker.lorem.word()} onChange={jest.fn()} readOnly />,
    )
    expect(baseElement.querySelectorAll('[readonly]')).toHaveLength(1)
    expect(baseElement.querySelectorAll('[aria-readonly]')).toHaveLength(1)
  })

  describe('collapsibility', () => {
    it('can be collapsed and expanded', async () => {
      const user = userEvent.setup()
      const { getByRole, baseElement } = render(
        <EditPreviewText value={faker.lorem.word()} onChange={jest.fn()} />,
      )

      expect(baseElement.querySelector('textarea')).toBeTruthy()
      await user.click(getByRole('button', { name: 'Collapse preview text' }))
      expect(baseElement.querySelector('textarea')).toBeFalsy()
      await user.click(getByRole('button', { name: 'Expand preview text' }))
      expect(baseElement.querySelector('textarea')).toBeTruthy()
    })
  })
})
