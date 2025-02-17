import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { InformationalBoxControls } from '../InformationalBoxControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'

jest.mock('src/ui/UswdsIconSelect', () => {
  return {
    UswdsIconSelect: () => <div>UswdsIconSelect</div>,
  }
})

describe('InformationalBoxControls', () => {
  let rendered: RenderResult
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    rendered = render(
      <EmailPartsContent>
        <InformationalBoxControls
          emailSubComponent={buildUniqueEmailSubComponent({ kind: 'InformationalBox' })}
        />
      </EmailPartsContent>,
    )
  })

  it('provides a dropdown for selecting an icon', () => {
    const { baseElement } = rendered
    expect(baseElement).toHaveTextContent(/UswdsIconSelect/)
  })

  it('displays a dropdown for selecting an box color', async () => {
    const { getByRole, queryByRole, getByLabelText } = rendered
    let element = getByLabelText('Box Color')
    expect(element).toHaveTextContent('Benefit Blue')

    await user.click(element!)
    expect(queryByRole('option', { name: 'Benefit Blue' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Yielding Yellow' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'Yielding Yellow' }))

    element = getByLabelText('Box Color')
    expect(element).toHaveTextContent('Yielding Yellow')
  })

  it('provides a toggle for supportive information', async () => {
    const user = userEvent.setup()
    const { queryByLabelText } = rendered
    const toggle = queryByLabelText('+ Supportive Information')
    expect(toggle).not.toBeNull()
    expect(toggle).toBeChecked()

    await user.click(toggle!)
    expect(toggle).not.toBeChecked()

    await user.click(toggle!)
    expect(toggle).toBeChecked()
  })
})
