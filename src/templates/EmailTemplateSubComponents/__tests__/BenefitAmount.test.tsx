import React, { FC } from 'react'
import { faker } from '@faker-js/faker'
import { RenderResult, render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { EmailTemplate } from 'src/appTypes'
import {
  buildEmailTemplateSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
  renderEmailPart,
} from 'src/testHelpers'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import { BenefitAmount, useBenefitAmountValue } from '../BenefitAmount'

describe('BenefitAmount', () => {
  let componentId: string
  let id: string
  let emailSubComponent: EmailTemplate.SubComponent<'Body'>

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
    emailSubComponent = buildEmailTemplateSubComponent('Body', { kind: 'BenefitAmount' })
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = render(
      <BenefitAmount componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const key = buildSubComponentKey(componentId, id)
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Benefit Amount title'))
    expectActiveEmailPartToBe(key, baseElement)
  })

  describe('component', () => {
    let user: UserEvent
    let rendered: RenderResult
    let value: string
    let key: string

    beforeEach(() => {
      user = userEvent.setup()
      value = faker.lorem.words(3)
      key = buildSubComponentKey(componentId, id)
      rendered = render(
        <BenefitAmount componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
        { wrapper: emailPartWrapper },
      )
    })

    const itHasAnEditable = (testName: string, label: string) => {
      it(`has an editable ${testName}`, async () => {
        const element = rendered.getByLabelText(label)
        await user.clear(element)
        await user.type(element, value)
        expect(rendered.queryByText(value)).not.toBeNull()
        expectEmailPartContentFor(key, rendered.baseElement)
      })
    }

    itHasAnEditable('title', 'Benefit Amount title')
    itHasAnEditable('description', 'Benefit Amount description')
    itHasAnEditable('box title', 'Benefit Amount box title')
    itHasAnEditable('weekly rate label', 'Benefit Amount weekly rate label')
    itHasAnEditable('weekly rate value', 'Benefit Amount weekly rate value')
    itHasAnEditable('partial weekly rate label', 'Benefit Amount partial weekly rate label')
    itHasAnEditable('partial weekly rate value', 'Benefit Amount partial weekly rate value')
    itHasAnEditable('rate explanation', 'Benefit Amount rate explanation')
    itHasAnEditable('supportive information', 'Benefit Amount rate supportive information')
  })
})
