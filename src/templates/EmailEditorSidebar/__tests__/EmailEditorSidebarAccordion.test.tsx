import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@reach/accordion'
import { EmailEditorSidebarAccordion } from '../EmailEditorSidebarAccordion'
import { EmailParts } from 'src/appTypes'
import {
  WrapperComponent,
  buildUniqueEmailComponent,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { CurrentlyActiveEmailPart } from 'src/templates/CurrentlyActiveEmailPart'
import { SYNC_SIDEBAR_AND_PREVIEW_SCROLL } from 'src/templates/SyncSidebarAndPreviewScroll'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'

describe(EmailEditorSidebarAccordion.Container.displayName!, () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailEditorSidebarAccordion.Container>
        <span>{text}</span>
      </EmailEditorSidebarAccordion.Container>,
    )
    expect(baseElement).toContainHTML(`<span>${text}</span>`)
  })

  it('is an accordion', async () => {
    const user = userEvent.setup()
    const { baseElement, getByText } = render(
      <EmailEditorSidebarAccordion.Container>
        <AccordionItem>
          <AccordionButton>A</AccordionButton>
          <AccordionPanel>Panel A</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>B</AccordionButton>
          <AccordionPanel>Panel B</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>C</AccordionButton>
          <AccordionPanel>Panel C</AccordionPanel>
        </AccordionItem>
      </EmailEditorSidebarAccordion.Container>,
    )

    const totalItems = (state: 'open' | 'collapsed'): number =>
      baseElement.querySelectorAll(`[data-reach-accordion-item][data-state="${state}"]`).length

    expect(baseElement.querySelector('[data-reach-accordion]')).not.toBeNull()

    expect(totalItems('collapsed')).toEqual(3)
    expect(totalItems('open')).toEqual(0)

    await user.click(getByText('A'))
    expect(totalItems('collapsed')).toEqual(2)
    expect(totalItems('open')).toEqual(1)

    await user.click(getByText('B'))
    expect(totalItems('collapsed')).toEqual(1)
    expect(totalItems('open')).toEqual(2)

    await user.click(getByText('B'))
    expect(totalItems('collapsed')).toEqual(2)
    expect(totalItems('open')).toEqual(1)
  })

  it('can expand all accordion panels', async () => {
    const user = userEvent.setup()
    const { baseElement, getByText } = render(
      <EmailEditorSidebarAccordion.Container>
        <AccordionItem>
          <AccordionButton>A</AccordionButton>
          <AccordionPanel>Panel A</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>B</AccordionButton>
          <AccordionPanel>Panel B</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>C</AccordionButton>
          <AccordionPanel>Panel C</AccordionPanel>
        </AccordionItem>
      </EmailEditorSidebarAccordion.Container>,
    )
    const totalItems = (state: 'open' | 'collapsed'): number =>
      baseElement.querySelectorAll(`[data-reach-accordion-item][data-state="${state}"]`).length

    expect(totalItems('collapsed')).toEqual(3)
    expect(totalItems('open')).toEqual(0)
    await user.click(getByText('Expand All'))
    expect(totalItems('collapsed')).toEqual(0)
    expect(totalItems('open')).toEqual(3)
  })

  it('can collapse all accordion panels', async () => {
    const user = userEvent.setup()
    const { baseElement, getByText } = render(
      <EmailEditorSidebarAccordion.Container>
        <AccordionItem>
          <AccordionButton>A</AccordionButton>
          <AccordionPanel>Panel A</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>B</AccordionButton>
          <AccordionPanel>Panel B</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>C</AccordionButton>
          <AccordionPanel>Panel C</AccordionPanel>
        </AccordionItem>
      </EmailEditorSidebarAccordion.Container>,
    )
    const totalItems = (state: 'open' | 'collapsed'): number =>
      baseElement.querySelectorAll(`[data-reach-accordion-item][data-state="${state}"]`).length

    await user.click(getByText('A'))
    await user.click(getByText('B'))
    await user.click(getByText('C'))

    expect(totalItems('collapsed')).toEqual(0)
    expect(totalItems('open')).toEqual(3)
    await user.click(getByText('Collapse All'))
    expect(totalItems('collapsed')).toEqual(3)
    expect(totalItems('open')).toEqual(0)
  })
})

describe(EmailEditorSidebarAccordion.EmailComponent.displayName!, () => {
  let emailComponent: EmailParts.Unique.Component

  const wrapper: WrapperComponent = ({ children }) => {
    return (
      <EmailPartsContent>
        <Accordion>
          <AccordionItem>{children}</AccordionItem>
        </Accordion>
      </EmailPartsContent>
    )
  }

  const itIsHighlightedWhenTheComponentIsActive = () => {
    it('is highlighted when the component is active', () => {
      const { baseElement } = render(
        <EmailPartsContent>
          <CurrentlyActiveEmailPart initiallyActiveEmailPartId={emailComponent.id}>
            <Accordion>
              <AccordionItem>
                <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
                  <span />
                </EmailEditorSidebarAccordion.EmailComponent>
              </AccordionItem>
            </Accordion>
          </CurrentlyActiveEmailPart>
        </EmailPartsContent>,
      )
      expect(
        baseElement.querySelector(`.${SYNC_SIDEBAR_AND_PREVIEW_SCROLL.activeEmailComponentClass}`),
      ).not.toBeNull()
    })
  }

  const itIsHighlightedWhenAnyOfItsSubcomponentsAreActive = () => {
    it('is highlighted when any of its subcomponents are active', () => {
      const emailSubComponent = buildUniqueEmailSubComponent({ kind: 'ProgramName' })
      emailComponent.subComponents = [emailSubComponent]

      const { baseElement } = render(
        <EmailPartsContent>
          <CurrentlyActiveEmailPart initiallyActiveEmailPartId={emailSubComponent.id}>
            <Accordion>
              <AccordionItem>
                <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
                  <span />
                </EmailEditorSidebarAccordion.EmailComponent>
              </AccordionItem>
            </Accordion>
          </CurrentlyActiveEmailPart>
        </EmailPartsContent>,
      )
      expect(
        baseElement.querySelector(`.${SYNC_SIDEBAR_AND_PREVIEW_SCROLL.activeEmailComponentClass}`),
      ).not.toBeNull()
    })
  }

  const itIsNotHightlightedWhenTheComponentIsInactive = () => {
    it('is not hightlighted when the component is inactive', () => {
      const { baseElement } = render(
        <EmailPartsContent>
          <CurrentlyActiveEmailPart initiallyActiveEmailPartId={faker.lorem.words(3)}>
            <Accordion>
              <AccordionItem>
                <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
                  <span />
                </EmailEditorSidebarAccordion.EmailComponent>
              </AccordionItem>
            </Accordion>
          </CurrentlyActiveEmailPart>
        </EmailPartsContent>,
      )
      expect(
        baseElement.querySelector(`.${SYNC_SIDEBAR_AND_PREVIEW_SCROLL.activeEmailComponentClass}`),
      ).toBeNull()
    })
  }

  const itHasADisabledAccordionItem = () => {
    it('has a disabled accordion item', () => {
      const { baseElement } = render(
        <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
          <span />
        </EmailEditorSidebarAccordion.EmailComponent>,
        { wrapper },
      )
      const item = baseElement.querySelector('[data-reach-accordion-item] > div')
      expect(item).not.toBeNull()
      const attribute = item?.attributes.getNamedItem('data-disabled')
      expect(attribute).not.toBeNull()
    })
  }

  const itDoesNotDisplayChildrenInAnAccordionPanel = () => {
    it('does not display children in an accordion panel', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
          <span>{text}</span>
        </EmailEditorSidebarAccordion.EmailComponent>,
        { wrapper },
      )
      const panel = baseElement.querySelector('[data-reach-accordion-panel]')
      expect(panel).not.toBeNull()

      expect(panel).not.toContainHTML(`<span>${text}</span>`)
    })
  }

  describe('all', () => {
    const allKinds: EmailParts.Kinds.Component[] = [
      'Banner',
      'Body',
      'Disclaimer',
      'Footer',
      'Header',
      'Name',
      'StateSeal',
    ]

    allKinds.forEach((kind) => {
      describe(`when ${kind}`, () => {
        beforeEach(() => {
          emailComponent = buildUniqueEmailComponent(kind)
        })

        it('displays an accordion item header/button', () => {
          const { baseElement } = render(
            <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
              <span />
            </EmailEditorSidebarAccordion.EmailComponent>,
            { wrapper },
          )

          const headerButton = baseElement.querySelector('h3 > [data-reach-accordion-button]')
          expect(headerButton).not.toBeNull()
          const value = emailComponent.kind === 'StateSeal' ? 'State Seal' : emailComponent.kind
          expect(headerButton).toHaveTextContent(value)
        })
      })
    })
  })

  describe('when Name', () => {
    beforeEach(() => {
      emailComponent = buildUniqueEmailComponent('Name')
    })

    itIsHighlightedWhenTheComponentIsActive()

    itIsHighlightedWhenAnyOfItsSubcomponentsAreActive()

    itIsNotHightlightedWhenTheComponentIsInactive()

    itDoesNotDisplayChildrenInAnAccordionPanel()

    itHasADisabledAccordionItem()

    it('displays a toggle when the email component is not required', async () => {
      const user = userEvent.setup()
      emailComponent.required = false
      const { baseElement } = render(
        <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
          <span />
        </EmailEditorSidebarAccordion.EmailComponent>,
        { wrapper },
      )
      const input = baseElement.querySelector('.label-and-toggle input')
      expect(input).not.toBeNull()
      expect(input).not.toBeDisabled()
      expect(input).toBeChecked()

      await user.click(input!)
      expect(input).not.toBeChecked()
    })

    it('does not display a toggle when the email component is required', () => {
      emailComponent.required = true
      const { baseElement } = render(
        <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
          <span />
        </EmailEditorSidebarAccordion.EmailComponent>,
        { wrapper },
      )
      const input = baseElement.querySelector('input')
      expect(input).toBeNull()
    })
  })

  describe('subcomponent containers', () => {
    const kinds: EmailParts.Kinds.Component[] = ['Body', 'Footer', 'Header']

    kinds.forEach((kind) => {
      describe(`when ${kind}`, () => {
        beforeEach(() => {
          emailComponent = buildUniqueEmailComponent(kind)
        })

        itIsHighlightedWhenTheComponentIsActive()

        itIsHighlightedWhenAnyOfItsSubcomponentsAreActive()

        itIsNotHightlightedWhenTheComponentIsInactive()

        it('displays its children in an accordion panel', () => {
          const text = faker.lorem.paragraph()
          const { baseElement } = render(
            <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
              <span>{text}</span>
            </EmailEditorSidebarAccordion.EmailComponent>,
            { wrapper },
          )
          const panel = baseElement.querySelector('[data-reach-accordion-panel]')
          expect(panel).not.toBeNull()

          expect(panel).toContainHTML(`<span>${text}</span>`)
        })

        it('does not display a toggle', () => {
          emailComponent.required = false
          const { baseElement } = render(
            <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
              <span />
            </EmailEditorSidebarAccordion.EmailComponent>,
            { wrapper },
          )
          const input = baseElement.querySelector('input')
          expect(input).toBeNull()
        })

        it('has an enabled accordion item when the email component has subcomponents', () => {
          emailComponent.subComponents = [buildUniqueEmailSubComponent({ kind: 'Title' })]
          const { baseElement } = render(
            <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
              <span />
            </EmailEditorSidebarAccordion.EmailComponent>,
            { wrapper },
          )
          const item = baseElement.querySelector('[data-reach-accordion-item] > div')
          expect(item).not.toBeNull()
          const attribute = item?.attributes.getNamedItem('data-disabled')
          expect(attribute).toBeNull()
        })

        it('has a disabled accordion item when the email component lacks subcomponents', () => {
          emailComponent.subComponents = []
          const { baseElement } = render(
            <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
              <span />
            </EmailEditorSidebarAccordion.EmailComponent>,
            { wrapper },
          )
          const item = baseElement.querySelector('[data-reach-accordion-item] > div')
          expect(item).not.toBeNull()
          const attribute = item?.attributes.getNamedItem('data-disabled')
          expect(attribute).not.toBeNull()
        })
      })
    })
  })

  describe('when edited in settings', () => {
    const kinds: EmailParts.Kinds.Component[] = ['Banner', 'StateSeal', 'Disclaimer']

    kinds.forEach((kind) => {
      describe(`when ${kind}`, () => {
        beforeEach(() => {
          emailComponent = buildUniqueEmailComponent(kind)
        })

        itDoesNotDisplayChildrenInAnAccordionPanel()

        itHasADisabledAccordionItem()

        it('is marked as "required" and lacks a toggle', () => {
          emailComponent.required = true
          const { baseElement } = render(
            <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
              <span />
            </EmailEditorSidebarAccordion.EmailComponent>,
            { wrapper },
          )

          const input = baseElement.querySelector('.label-and-toggle input')
          expect(input).toBeNull()
          expect(baseElement).toHaveTextContent('Required')
        })
      })
    })
  })
})

describe(EmailEditorSidebarAccordion.EmailSubComponent.displayName!, () => {
  let emailSubComponent: EmailParts.Unique.SubComponent
  let emailComponent: EmailParts.Unique.Component

  const wrapper: WrapperComponent = ({ children }) => {
    return <EmailPartsContent>{children}</EmailPartsContent>
  }

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'ProgramName' })
    emailComponent = buildUniqueEmailComponent('Body')
  })

  it('displays a label', () => {
    const { queryByText } = render(
      <EmailEditorSidebarAccordion.EmailSubComponent
        component={emailComponent}
        emailSubComponent={emailSubComponent}
        nextEmailSubComponent={undefined}
      />,
      { wrapper },
    )

    expect(queryByText('Program Name')).not.toBeNull()
  })

  it('displays an enabled toggle when not required', async () => {
    const user = userEvent.setup()
    emailSubComponent.required = false
    const { queryByLabelText } = render(
      <EmailEditorSidebarAccordion.EmailSubComponent
        component={emailComponent}
        emailSubComponent={emailSubComponent}
        nextEmailSubComponent={undefined}
      />,
      { wrapper },
    )
    const input = queryByLabelText('Program Name')
    expect(input).not.toBeNull()
    expect(input).not.toBeDisabled()
    expect(input).toBeChecked()

    await user.click(input!)
    expect(input).not.toBeChecked()
  })

  it('displays disabled toggle when required', () => {
    emailSubComponent.required = true
    const { queryByLabelText } = render(
      <EmailEditorSidebarAccordion.EmailSubComponent
        component={emailComponent}
        emailSubComponent={emailSubComponent}
        nextEmailSubComponent={undefined}
      />,
      { wrapper },
    )
    const input = queryByLabelText('Program Name')
    expect(input).not.toBeNull()
    expect(input).toBeDisabled()
    expect(input).toBeChecked()
  })

  it('displays subcomponent controls', () => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'Status' })
    const { queryByText } = render(
      <EmailEditorSidebarAccordion.EmailSubComponent
        component={emailComponent}
        emailSubComponent={emailSubComponent}
        nextEmailSubComponent={undefined}
      />,
      { wrapper },
    )
    expect(queryByText('Status variant')).not.toBeNull()
  })

  it('displays subcomponent floating controls', () => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'Status' })
    const { queryByText } = render(
      <EmailEditorSidebarAccordion.EmailSubComponent
        component={emailComponent}
        emailSubComponent={emailSubComponent}
        nextEmailSubComponent={buildUniqueEmailSubComponent({ kind: 'Directive' })}
      />,
      { wrapper },
    )
    expect(queryByText('Spacing')).not.toBeNull()
  })

  it('is highlighted when the subcomponent is active', () => {
    const { baseElement } = render(
      <EmailPartsContent>
        <CurrentlyActiveEmailPart initiallyActiveEmailPartId={emailSubComponent.id}>
          <EmailEditorSidebarAccordion.EmailSubComponent
            component={emailComponent}
            emailSubComponent={emailSubComponent}
            nextEmailSubComponent={undefined}
          />
        </CurrentlyActiveEmailPart>
      </EmailPartsContent>,
    )
    expect(
      baseElement.querySelector(`.${SYNC_SIDEBAR_AND_PREVIEW_SCROLL.activeEmailSubcomponentClass}`),
    ).not.toBeNull()
  })

  it('is not hightlighted when the subcomponent is inactive', () => {
    const { baseElement } = render(
      <EmailPartsContent>
        <CurrentlyActiveEmailPart initiallyActiveEmailPartId={faker.lorem.words(3)}>
          <EmailEditorSidebarAccordion.EmailSubComponent
            component={emailComponent}
            emailSubComponent={emailSubComponent}
            nextEmailSubComponent={undefined}
          />
        </CurrentlyActiveEmailPart>
      </EmailPartsContent>,
    )
    expect(
      baseElement.querySelector(`.${SYNC_SIDEBAR_AND_PREVIEW_SCROLL.activeEmailSubcomponentClass}`),
    ).toBeNull()
  })
})
