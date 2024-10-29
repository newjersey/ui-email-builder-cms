import { render } from '@testing-library/react'
import React from 'react'
import { EmailComponentSpacer } from '../EmailComponentSpacer'
import { buildUniqueEmailComponent, emailPartWrapper } from 'src/testHelpers'
import { spacingCellSizes } from 'src/templates/styles'
import { EmailTemplate } from 'src/appTypes'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'

describe('EmailComponentSpacer', () => {
  const renderWithComponents = ({
    currentComponent,
    nextComponent,
  }: {
    currentComponent: EmailTemplate.Kinds.Component
    nextComponent: EmailTemplate.Kinds.Component | undefined
  }) => {
    const { baseElement } = render(
      <EmailComponentSpacer
        currentComponent={buildUniqueEmailComponent(currentComponent)}
        nextComponent={nextComponent && buildUniqueEmailComponent(nextComponent)}
      />,
      {
        wrapper: emailPartWrapper,
      },
    )

    const spacer = baseElement.querySelector('td')
    return spacer?.style.height
  }

  it('is nothing when the component should not be shown', () => {
    const currentComponent = buildUniqueEmailComponent('Banner')
    const { baseElement } = render(
      <ShouldShowEmailPart initialData={{ [currentComponent.id]: false }}>
        <EmailComponentSpacer
          currentComponent={currentComponent}
          nextComponent={buildUniqueEmailComponent('Header')}
        />
      </ShouldShowEmailPart>,
      {
        wrapper: emailPartWrapper,
      },
    )
    expect(baseElement.querySelector('td')).toBeNull()
  })

  it(`is extraLarge when the current component is Banner`, () => {
    const size = renderWithComponents({
      currentComponent: 'Banner',
      nextComponent: 'Header',
    })

    expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
  })

  it(`is extraLarge when the current component is Header`, () => {
    const size = renderWithComponents({
      currentComponent: 'Header',
      nextComponent: 'Name',
    })

    expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
  })

  it(`is medium when the current component is Name`, () => {
    const size = renderWithComponents({
      currentComponent: 'Name',
      nextComponent: 'Body',
    })

    expect(size).toEqual(`${spacingCellSizes.medium}px`)
  })

  it('is nothing when the current component is Body', () => {
    const size = renderWithComponents({
      currentComponent: 'Body',
      nextComponent: 'Body',
    })

    expect(size).toBeUndefined()
  })

  it(`is extraLarge when the current component is StateSeal`, () => {
    const size = renderWithComponents({
      currentComponent: 'StateSeal',
      nextComponent: 'Disclaimer',
    })

    expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
  })

  it(`is medium when the current component is Footer`, () => {
    const size = renderWithComponents({
      currentComponent: 'Footer',
      nextComponent: 'Disclaimer',
    })

    expect(size).toEqual(`${spacingCellSizes.medium}px`)
  })

  it('is nothing when the current component is Disclaimer', () => {
    const size = renderWithComponents({
      currentComponent: 'Disclaimer',
      nextComponent: undefined,
    })

    expect(size).toBeUndefined()
  })
})
