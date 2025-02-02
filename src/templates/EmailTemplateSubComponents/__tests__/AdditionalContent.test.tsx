import React from 'react'
import { AdditionalContent } from '../AdditionalContent'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { EmailParts } from 'src/appTypes'
import {
  buildUniqueEmailSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
} from 'src/testHelpers'
import { RICH_TEXT_EDITOR_TEST_ID as richTextEditorTestId } from 'src/ui'

describe('AdditionalContent', () => {
  let emailSubComponent: EmailParts.AdditionalContent

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'AdditionalContent' })
  })

  it('is editable', async () => {
    const user = userEvent.setup()
    const { getByLabelText, queryByTestId } = render(
      <AdditionalContent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const input = getByLabelText('Additional content')
    await user.click(input)
    expect(queryByTestId(richTextEditorTestId)).not.toBeNull()
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = render(
      <AdditionalContent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const key = emailSubComponent.id
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Additional content'))
    expectActiveEmailPartToBe(key, baseElement)
  })

  it('can be read only', async () => {
    const { baseElement } = render(
      <AdditionalContent emailSubComponent={emailSubComponent} readOnly />,
      {
        wrapper: emailPartWrapper,
      },
    )
    expect(baseElement.querySelectorAll('[readonly]')).toHaveLength(1)
  })
})
