import React, { FC } from 'react'
import { MoreInfo } from 'src/ui'
import { MoreInfoImage } from './Shared'
import directiveButtonPng from './images/directive-button.png'
import directive3StepPng from './images/directive-3-step.png'
import directiveControlsPng from './images/directive-controls.png'

export const MoreInfoAboutDirective: FC = () => {
  const directiveButton = <strong>Directive Button</strong>
  const directive = <strong>Directive</strong>
  return (
    <MoreInfo title="Directive">
      <p>
        Use the {directive} when there's a specific action or a series of actions you want the email
        recipient to take, such as creating an account, filling out a form, or anything else. It can
        contain one or three steps.
      </p>
      <MoreInfoImage
        alt={`A three step directive feature the same black directive button`}
        src={directive3StepPng}
      />
      <p>
        The {directive} is configurable, so if there's a step that doesn't require as much
        explanation as the others you can make adjustments in the {directive} controls.
      </p>
      <MoreInfoImage
        alt={`The sidebar controls for a directive with "Three Steps" selected`}
        src={directiveControlsPng}
      />
      <p>
        Some emails feature a {directiveButton} in the header. This will always has the same
        background color, text, and link as the button in the {directive}.
      </p>
      <MoreInfoImage
        alt={`A black directive button that reads "Get Started"`}
        src={directiveButtonPng}
      />
      <p>
        In order to change the {directiveButton}, please edit the {directive} itself.
      </p>
    </MoreInfo>
  )
}
