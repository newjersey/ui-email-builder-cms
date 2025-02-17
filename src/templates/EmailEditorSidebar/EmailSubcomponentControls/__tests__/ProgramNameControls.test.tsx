import React, { FC } from 'react'
import { RenderResult, render } from '@testing-library/react'
import { ProgramNameControls } from '../ProgramNameControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { faker } from '@faker-js/faker'
import { buildUniqueEmailSubComponent, mockAppMode } from 'src/testHelpers'
import { UserEvent, userEvent } from '@testing-library/user-event'
import { EmailParts } from 'src/appTypes'
import { useProgramNameValue } from 'src/templates/EmailTemplateSubComponents/ProgramName'

describe('ProgramNameControls', () => {
  let user: UserEvent
  let rendered: RenderResult
  let subComponent: EmailParts.ProgramName

  beforeEach(() => {
    subComponent = buildUniqueEmailSubComponent({ kind: 'ProgramName' })
  })

  describe('when in NJ mode', () => {
    const Dummy: FC = () => {
      const [value] = useProgramNameValue(subComponent)
      return (
        <div>
          <span id="name">{value.name}</span>
          <span id="background-color">{value.backgroundColor}</span>
        </div>
      )
    }

    const currentName = () => rendered.baseElement.querySelector('#name')
    const currentBackgroundColor = () => rendered.baseElement.querySelector('#background-color')

    beforeEach(() => {
      mockAppMode('NJ')
      user = userEvent.setup()
      rendered = render(
        <EmailPartsContent>
          <ProgramNameControls emailSubComponent={subComponent} />
          <Dummy />
        </EmailPartsContent>,
      )
    })

    it('provides a dropdown that allows users to choose from a curated set of colors and texts', async () => {
      const { queryByRole, getByLabelText } = rendered

      await user.click(getByLabelText('Background Color Preset'))
      ;[
        'Dependency Benefits',
        'Disaster Unemployment Assistance (DUA)',
        'Mixed Earners Unemployment Compensation (MEUC)',
        'Pandemic Unemployment Assistance (PUA)',
        'Pandemic Unemployment Overpayment',
        'Unemployment Insurance (UI)',
        'Unemployment Insurance (UI) Dependency Benefits',
        'Unemployment Insurance (UI) Monetary Eligibility',
        'Custom',
      ].forEach((name) => {
        expect(queryByRole('option', { name })).not.toBeNull()
      })
    })

    it('does not provide a general color picker', async () => {
      const { queryByLabelText } = rendered
      expect(queryByLabelText('Background Color Hex Code')).toBeNull()
    })

    describe('when selecting a preset (except custom)', () => {
      it('changes the color when a new preset is selected', async () => {
        const { getByRole, getByLabelText } = rendered
        expect(currentBackgroundColor()).toHaveTextContent('#E1E291')
        await user.click(getByLabelText('Background Color Preset'))
        await user.click(getByRole('option', { name: 'Pandemic Unemployment Overpayment' }))
        expect(currentBackgroundColor()).toHaveTextContent('#F1DEA0')
      })

      it('changes the text when a new preset is selected', async () => {
        const { getByRole, getByLabelText } = rendered
        expect(currentName()).toHaveTextContent('Dependency Benefits')
        await user.click(getByLabelText('Background Color Preset'))
        await user.click(getByRole('option', { name: 'Pandemic Unemployment Overpayment' }))
        expect(currentName()).toHaveTextContent('Pandemic Unemployment Overpayment')
      })
    })

    describe('when selecting custom', () => {
      it('displays the a general color selector', async () => {
        const { getByRole, queryByLabelText, getByLabelText } = rendered
        expect(queryByLabelText('Background Color Hex Code')).toBeNull()
        await user.click(getByLabelText('Background Color Preset'))
        await user.click(getByRole('option', { name: 'Custom' }))
        expect(queryByLabelText('Background Color Hex Code')).not.toBeNull()
      })

      it('does not change the color', async () => {
        const { getByRole, getByLabelText } = rendered
        expect(currentBackgroundColor()).toHaveTextContent('#E1E291')
        await user.click(getByLabelText('Background Color Preset'))
        await user.click(getByRole('option', { name: 'Custom' }))
        expect(currentBackgroundColor()).toHaveTextContent('#E1E291')
      })

      it('does not change the text', async () => {
        const { getByRole, getByLabelText } = rendered
        expect(currentName()).toHaveTextContent('Dependency Benefits')
        await user.click(getByLabelText('Background Color Preset'))
        await user.click(getByRole('option', { name: 'Custom' }))
        expect(currentName()).toHaveTextContent('Dependency Benefits')
      })
    })
  })

  describe('when in all states mode', () => {
    beforeEach(() => {
      mockAppMode('ALL')
      user = userEvent.setup()
      rendered = render(
        <EmailPartsContent>
          <ProgramNameControls emailSubComponent={subComponent} />
        </EmailPartsContent>,
      )
    })

    it('provides a color picker for the background color', async () => {
      const color = faker.color.rgb()
      const { getByLabelText } = rendered
      const colorPicker = getByLabelText('Background Color')
      const hexInput = getByLabelText('Background Color Hex Code')
      await user.clear(hexInput)
      await user.type(hexInput, color.replace('#', ''))
      expect(hexInput).toHaveValue(color)
      expect(colorPicker).toHaveValue(color)
    })

    it('does not provide a curated set of colors', () => {
      expect(rendered.baseElement).not.toHaveTextContent('Background Color Preset')
    })
  })

  describe('when in another state mode', () => {
    beforeEach(() => {
      mockAppMode('AK')
      user = userEvent.setup()
      rendered = render(
        <EmailPartsContent>
          <ProgramNameControls emailSubComponent={subComponent} />
        </EmailPartsContent>,
      )
    })

    it('provides a color picker for the background color', async () => {
      const color = faker.color.rgb()
      const { getByLabelText } = rendered
      const colorPicker = getByLabelText('Background Color')
      const hexInput = getByLabelText('Background Color Hex Code')
      await user.clear(hexInput)
      await user.type(hexInput, color.replace('#', ''))
      expect(hexInput).toHaveValue(color)
      expect(colorPicker).toHaveValue(color)
    })

    it('does not provide a curated set of colors', () => {
      expect(rendered.baseElement).not.toHaveTextContent('Background Color Preset')
    })
  })
})
