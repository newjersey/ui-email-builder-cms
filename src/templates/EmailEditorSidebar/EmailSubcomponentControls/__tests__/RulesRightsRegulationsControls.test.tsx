import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { RulesRightsRegulationsControls } from '../RulesRightsRegulationsControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'

jest.mock('src/ui/UswdsIconSelect', () => {
  return {
    UswdsIconSelect: () => <div>UswdsIconSelect</div>,
  }
})

describe('RulesRightsRegulationsControls', () => {
  let rendered: RenderResult
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    rendered = render(
      <EmailPartsContent>
        <RulesRightsRegulationsControls
          emailSubComponent={buildUniqueEmailSubComponent({
            kind: 'RulesRightsRegulations',
          })}
        />
      </EmailPartsContent>,
    )
  })

  it('provides a dropdown for selecting a variant', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByRole, getByLabelText } = rendered
    let element = getByLabelText('Rules, Rights, and Regulations variant')
    expect(element).not.toBeNull()
    expect(element).toHaveTextContent('Reminder')

    await user.click(element!)
    expect(queryByRole('option', { name: 'Reminder' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Appeal Rights' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Your Rights' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'Appeal Rights' }))

    element = getByLabelText('Rules, Rights, and Regulations variant')
    expect(element).not.toBeNull()
  })

  describe('variants', () => {
    describe('Reminder', () => {
      beforeEach(async () => {
        await user.click(rendered.getByLabelText('Rules, Rights, and Regulations variant'))
        await user.click(rendered.getByRole('option', { name: 'Reminder' }))
      })

      it('provides a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).toHaveTextContent(/UswdsIconSelect/)
      })
    })

    describe('Appeal Rights', () => {
      beforeEach(async () => {
        await user.click(rendered.getByLabelText('Rules, Rights, and Regulations variant'))
        await user.click(rendered.getByRole('option', { name: 'Appeal Rights' }))
      })

      it('provides a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).toHaveTextContent(/UswdsIconSelect/)
      })

      it('only has the correct switches', () => {
        const all = rendered.queryAllByRole('switch')
        expect(all).toHaveLength(3)
      })

      it('can have the instruction toggled on and off', async () => {
        const { getByRole } = rendered
        const getSwitch = (): HTMLInputElement =>
          getByRole('switch', { name: 'Instruction' }) as any

        expect(getSwitch()).toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).not.toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).toBeChecked()
      })

      it('can have the information label toggled on and off', async () => {
        const { getByRole } = rendered
        const getSwitch = (): HTMLInputElement =>
          getByRole('switch', { name: 'Information Label' }) as any

        expect(getSwitch()).toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).not.toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).toBeChecked()
      })

      it('can have the information toggled on and off', async () => {
        const { getByRole } = rendered
        const getSwitch = (): HTMLInputElement =>
          getByRole('switch', { name: 'Information' }) as any

        expect(getSwitch()).toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).not.toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).toBeChecked()
      })
    })

    describe('Your Rights', () => {
      beforeEach(async () => {
        await user.click(rendered.getByLabelText('Rules, Rights, and Regulations variant'))
        await user.click(rendered.getByRole('option', { name: 'Your Rights' }))
      })

      it('does not provide a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).not.toHaveTextContent(/UswdsIconSelect/)
      })

      it('can have the description toggled on and off', async () => {
        const { getByRole } = rendered
        const getSwitch = (): HTMLInputElement =>
          getByRole('switch', { name: 'Description' }) as any

        expect(getSwitch()).toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).not.toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).toBeChecked()
      })

      it('only has the correct switches', () => {
        const all = rendered.queryAllByRole('switch')
        expect(all).toHaveLength(1)
      })
    })
  })
})
