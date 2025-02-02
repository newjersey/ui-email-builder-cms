import { DirectiveValue, DirectiveVariant } from 'src/appTypes'
import { Colors } from 'src/templates/styles'

export const defaultDirectiveValue: DirectiveValue = {
  variant: DirectiveVariant.OneStep,
  title: 'Directive Title',
  showTitle: true,
  showLabel: true,
  label: [
    {
      type: 'paragraph',
      children: [{ text: 'To help resolve this issue, complete the following steps:' }],
    },
  ],
  linkHref:
    'https://link.embedded-into-the-button-above.should-be-shown-here-in-order-to-give-an-alternative-way-to-access-a-link',
  buttonLabel: 'Get Started',
  buttonColor: Colors.black,
  step1Label: [{ type: 'paragraph', children: [{ text: 'Step 1 Directive', bold: true }] }],
  showStep1AdditionalContent: true,
  step1Additional: [
    {
      type: 'paragraph',
      children: [{ text: 'Additional information around Step 1' }],
    },
  ],
  oneStepSupportiveText: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Supportive information around how the status above was informed and how a claimant will receive more detailed information and/or a determination.',
          italic: true,
        },
      ],
    },
  ],
  step2Label: [{ type: 'paragraph', children: [{ text: 'Step 2 Directive', bold: true }] }],
  showStep2AdditionalContent: true,
  step2Additional: [
    {
      type: 'paragraph',
      children: [{ text: 'Additional information around Step 2' }],
    },
  ],
  step2Tertiary: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Tertiary information around Step 2, (usually involving an alternate way to complete the second step).',
        },
      ],
    },
  ],
  step2CaseNumber: [{ type: 'paragraph', children: [{ text: 'Case #: [000000]' }] }],
  step3Label: [{ type: 'paragraph', children: [{ text: 'Step 3 Directive', bold: true }] }],
  showStep3AdditionalContent: true,
  step3Additional: [
    {
      type: 'paragraph',
      children: [{ text: 'Additional information around Step 3' }],
    },
  ],
  showMultipleStepsSupportiveText: true,
  multipleStepsSupportiveText: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a tellus nec eros placerat ornare at sed ante. Duis enim quam, auctor quis congue eget, commodo eu urna. Donec laoreet a dui consequat sollicitudin. Aliquam et dapibus ex, at malesuada tellus.',
          italic: true,
        },
      ],
    },
  ],
  alternativePaymentLabel:
    'Or, send a check here: <br>Bureau of Benefit Payment Control<br>c/o Refund Processing Station<br>P.O. Box 951<br>Trenton, NJ 08625-0951',
  payOnlineSupportiveText: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Make the check or money order payable to NJ Dept. of Labor and Workforce Development. Be sure to write your name and social security number on the payment.',
        },
      ],
    },
  ],
}
