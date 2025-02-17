import React from 'react'
import { EditEmailComponent } from '../EditEmailComponent'
import { DisclaimerValue, EmailParts } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  emailPartWrapper,
} from 'src/testHelpers'
import { render } from '@testing-library/react'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { EmailTemplateState } from 'src/utils/EmailTemplateState'

describe('EditEmailComponent', () => {
  let emailComponent: EmailParts.Unique.Component

  beforeEach(() => {
    emailComponent = buildUniqueEmailComponent('Header')
  })

  it('displays nothing when the component should not be shown', () => {
    const { baseElement } = render(
      <EmailPartsContent initialData={{ [emailComponent.id]: { visible: false } }}>
        <EditEmailComponent emailComponent={emailComponent}>
          <tr>
            <td>{faker.lorem.paragraph()}</td>
          </tr>
        </EditEmailComponent>
      </EmailPartsContent>,
      { wrapper: emailPartWrapper },
    )
    const tbody = baseElement.querySelector('tbody')
    expect(tbody).not.toBeNull()
    expect(tbody).toBeEmptyDOMElement()
  })

  it('passes props through', async () => {
    emailComponent = buildUniqueEmailComponent('Name')
    const { baseElement } = render(
      <EditEmailComponent emailComponent={emailComponent} readOnly>
        <tr />
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement.querySelectorAll('[readonly]')).toHaveLength(1)
  })

  it('can render a Header', () => {
    emailComponent = buildUniqueEmailComponent('Header')
    const text = faker.lorem.paragraph()
    const { queryByText } = render(
      <EditEmailComponent emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render a Footer', () => {
    emailComponent = buildUniqueEmailComponent('Footer')
    const text = faker.lorem.paragraph()
    const { queryByText } = render(
      <EditEmailComponent emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render a Name', () => {
    emailComponent = buildUniqueEmailComponent('Name')
    const { queryByLabelText } = render(
      <EditEmailComponent emailComponent={emailComponent}>
        <tr />
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText("Recipient's name")).not.toBeNull()
  })

  it('can render a TranslationLinks', () => {
    emailComponent = buildUniqueEmailComponent('TranslationLinks')
    const { queryByLabelText } = render(
      <EmailTemplateState
        emailTemplate={buildUniqueEmailConfig({
          translations: [buildEmailTranslation({ language: 'english' })],
        })}
      >
        {() => (
          <EditEmailComponent emailComponent={emailComponent}>
            <tr />
          </EditEmailComponent>
        )}
      </EmailTemplateState>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText('English label')).not.toBeNull()
  })

  it('can render a Body', () => {
    emailComponent = buildUniqueEmailComponent('Body')
    const text = faker.lorem.paragraph()
    const { queryByText } = render(
      <EditEmailComponent emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render a Disclaimer', () => {
    emailComponent = buildUniqueEmailComponent('Disclaimer')
    const text = faker.lorem.paragraph()
    const disclaimerValue: DisclaimerValue = {
      content: [{ type: 'paragraph', children: [{ text }] }],
    }
    localStorage.setItem('disclaimer', JSON.stringify(disclaimerValue))
    const { queryByText } = render(
      <EditEmailComponent emailComponent={emailComponent}>{null}</EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render a Banner', () => {
    emailComponent = buildUniqueEmailComponent('Banner')
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EditEmailComponent emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement.querySelectorAll('.banner-link-container')).not.toHaveLength(0)
  })
})
