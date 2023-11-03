import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Borders, Colors, Font, Spacing, SpacingCell, StyleDefaults, Text } from '../styles'
import { EmailBlock } from 'src/ui'

export const enum DirectiveVariant {
  OneStep,
  ThreeStep,
  StepTwoExpansion,
  // CostBreakdown,
  PayOnline,
}

export interface DirectiveValue {
  variant: DirectiveVariant

  // Always Used
  title: string
  showTitle: boolean
  label: string
  linkHref: string
  buttonLabel: string

  // OneStep
  step1Label: string
  step1Additional: string
  oneStepSupportiveText: string

  // ThreeStep uses OneStep values
  step2Label: string
  showStep1AdditionalContent: boolean
  showStep2AdditionalContent: boolean
  step2Additional: string
  step3Label: string
  showStep3AdditionalContent: boolean
  step3Additional: string

  // StepTwoExpansion uses ThreeStep values
  step2Tertiary: string
  step2CaseNumber: string

  // PayOnline uses OneStep values
  alternativePaymentLabel: string
  payOnlineSupportiveText: string

  // CostBreakdown
}

export const defaultValue: DirectiveValue = {
  variant: DirectiveVariant.OneStep,
  title: 'Directive Title',
  showTitle: true,
  label: 'To help resolve this issue, complete the following steps:',
  linkHref: '',
  buttonLabel: 'Get Started',
  step1Label: 'Step 1 Directive',
  showStep1AdditionalContent: true,
  step1Additional: 'Additional information around Step 1',
  oneStepSupportiveText:
    'Supportive information around how the status above was informed and how a claimant will receive more detailed information and/or a determination.',
  step2Label: 'Step 2 Directive',
  showStep2AdditionalContent: true,
  step2Additional: 'Additional information around Step 2',
  step2Tertiary:
    'Tertiary information around Step 2, (usually involving an alternate way to complete the second step).',
  step2CaseNumber: 'Case #: [000000]',
  step3Label: 'Step 3 Directive',
  showStep3AdditionalContent: true,
  step3Additional: 'Additional information around Step 3',
  alternativePaymentLabel:
    'Or, send a check here: <br>Bureau of Benefit Payment Control<br>c/o Refund Processing Station<br>P.O. Box 951<br>Trenton, NJ 08625-0951',
  payOnlineSupportiveText:
    'Make the check or money order payable to NJ Dept. of Labor and Workforce Development. Be sure to write your name and social security number on the payment.',
}

export const useDirectiveValue = (componentId: string, id: string) => {
  return useEmailPartsContentForSubComponent(componentId, id, defaultValue)
}

const { Table, Row, Cell, Link } = EmailBlock

export const Directive: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)

  const [value, setValue] = useEmailPartsContentForSubComponent(componentId, id, defaultValue)
  return (
    <>
      <Row
        elements={[
          { part: 'cell', className: 'section-wrapper' },
          { part: 'table', className: 'el-center', align: 'center' },
          'row',
          { part: 'cell', className: StyleDefaults.layout.narrow, style: outerCellStyles },
          {
            part: 'table',
            style: [DirectiveVariant.PayOnline].includes(value.variant) ? payOnlineBoxStyles : {},
          },
        ]}
        onClick={activate}
      >
        {/* Directive Title */}
        {value.showTitle && (
          <>
            <Row
              elements={['cell', 'table', 'row', { part: 'cell', style: { textAlign: 'left' } }]}
            >
              <div style={{ lineHeight: '150%' }}>
                <h2 style={stepNumberLabel}>
                  {[DirectiveVariant.PayOnline].includes(value.variant) ? (
                    <>
                      <b>Pay Online</b> today
                    </>
                  ) : (
                    <EditableElement
                      element="b"
                      label="Directive Title"
                      onValueChange={(title) => setValue({ ...value, title })}
                      value={value.title}
                    />
                  )}
                </h2>
              </div>
            </Row>
          </>
        )}

        {/* One Step or Pay Online */}
        {[DirectiveVariant.OneStep, DirectiveVariant.PayOnline].includes(value.variant) && (
          <>
            <Row elements={['cell', { part: 'table', align: 'left' }]}>
              {/* Space Above Button */}
              <Row elements={['cell']}>
                <div style={spaceStyles}>&nbsp;</div>
              </Row>

              {/* Button */}
              <Row
                elements={[
                  'cell',
                  { part: 'table', width: 'unset' },
                  'row',
                  { part: 'cell', style: getStartedButtonStyles },
                ]}
              >
                <Link to={value.linkHref}>
                  <span style={getStartedButtonTextStyles}>{value.buttonLabel}</span>
                </Link>
              </Row>

              {/* Space After Button */}
              <Row elements={['cell']}>
                <div style={spaceStyles}>&nbsp;</div>
              </Row>

              {/* Same Link As Button */}
              <Row elements={['cell']}>
                <div
                  className="link-div"
                  style={{
                    lineHeight: '150%',
                    wordBreak: 'break-all',
                    paddingBottom: '16px',
                  }}
                >
                  <span style={hrefTextStyles}>
                    {value.linkHref ||
                      'https://link.embedded-into-the-button-above.should-be-shown-here-in-order-to-give-an-alternative-way-to-access-a-link'}
                  </span>
                </div>
              </Row>
            </Row>

            {[DirectiveVariant.OneStep].includes(value.variant) && (
              <tr>
                <EditableElement
                  element="td"
                  label="Supportive information"
                  onValueChange={(oneStepSupportiveText) =>
                    setValue({ ...value, oneStepSupportiveText })
                  }
                  value={value.oneStepSupportiveText}
                  style={supportiveInformationStyles}
                />
              </tr>
            )}

            {[DirectiveVariant.PayOnline].includes(value.variant) && (
              <>
                <tr>
                  <EditableElement
                    element="td"
                    label="Alternative payment information"
                    onValueChange={(alternativePaymentLabel) =>
                      setValue({ ...value, alternativePaymentLabel })
                    }
                    value={value.alternativePaymentLabel}
                    style={alternativePaymentStyles}
                  />
                </tr>

                <tr>
                  <td>
                    <div style={{ height: '15px', lineHeight: '15px', fontSize: '15px' }}>
                      &nbsp;
                    </div>
                  </td>
                </tr>

                <tr>
                  <EditableElement
                    element="td"
                    label="Supportive information"
                    onValueChange={(payOnlineSupportiveText) =>
                      setValue({ ...value, payOnlineSupportiveText })
                    }
                    value={value.payOnlineSupportiveText}
                    style={supportiveInformationStyles}
                  />
                </tr>
              </>
            )}
          </>
        )}

        {/* Three Step Directive and Step 2 Expansion */}
        {[DirectiveVariant.ThreeStep, DirectiveVariant.StepTwoExpansion].includes(
          value.variant,
        ) && (
          <>
            {/* Directive Label */}
            <Row
              elements={['cell', 'table', 'row', { part: 'cell', style: { textAlign: 'left' } }]}
            >
              <div style={{ lineHeight: '150%' }}>
                <EditableElement
                  element="span"
                  label="Label for the Directive"
                  onValueChange={(label) => setValue({ ...value, label })}
                  value={value.label}
                  style={directiveLabelStyles}
                />
              </div>
            </Row>

            {/* Space Above Steps */}
            <Row elements={['cell']}>
              <div style={{ height: '15px', lineHeight: '15px', fontSize: '15px' }}>&nbsp;</div>
            </Row>

            {/* Steps */}
            <Row elements={['cell', { part: 'table', align: 'center' }, 'row', 'cell', 'table']}>
              {/* Step 1 */}
              <Row>
                {/* Step 1 Circle Number */}
                <Cell>
                  <div className="circle-number" style={circleNumberStyles}>
                    <Table
                      className="circle-number-table el-center"
                      align="center"
                      style={circleNumberTableStyles}
                      elements={['row', 'cell']}
                    >
                      1
                    </Table>
                  </div>
                </Cell>

                {/* Step 1 Label */}
                <Cell style={{ paddingLeft: '18px', paddingTop: '4px' }}>
                  <div style={{ lineHeight: '145%' }}>
                    <span style={stepNumberLabel}>
                      <EditableElement
                        element="b"
                        label="Label for Step 1"
                        onValueChange={(step1Label) => setValue({ ...value, step1Label })}
                        value={value.step1Label}
                      />
                    </span>
                  </div>
                </Cell>
              </Row>

              {/* Step 1 Additional Information */}

              <Row>
                <Cell align="center">
                  <div id="step-bar-1-2" className="step-bar" style={stepBar12Styles}></div>
                </Cell>
                <Cell style={tdPaddingStyles}>
                  {value.showStep1AdditionalContent && (
                    <div style={{ lineHeight: '16px' }}>
                      <EditableElement
                        element="span"
                        label="Additional information for Step 1"
                        onValueChange={(step1Additional) => setValue({ ...value, step1Additional })}
                        value={value.step1Additional}
                        style={stepDescriptionStyles}
                      />
                    </div>
                  )}
                  {/* Button Table */}
                  <Table align="left">
                    {/* Space Above Button */}
                    <Row elements={['cell']}>
                      <div style={spaceStyles}>&nbsp;</div>
                    </Row>

                    {/* Button */}
                    <Row
                      elements={[
                        'cell',
                        { part: 'table', width: 'unset' },
                        'row',
                        { part: 'cell', style: getStartedButtonStyles },
                      ]}
                    >
                      <Link to={value.linkHref}>
                        <span style={getStartedButtonTextStyles}>{value.buttonLabel}</span>
                      </Link>
                    </Row>

                    {/* Space After Button */}
                    <Row elements={['cell']}>
                      <div style={spaceStyles}>&nbsp;</div>
                    </Row>

                    {/* Same Link As Button */}
                    <Row elements={['cell']}>
                      <div
                        className="link-div"
                        style={{
                          lineHeight: '150%',
                          wordBreak: 'break-all',
                          paddingBottom: '16px',
                        }}
                      >
                        <Link to={value.linkHref} style={hrefTextStyles}>
                          {value.linkHref}
                        </Link>
                      </div>
                    </Row>
                  </Table>
                </Cell>
              </Row>

              {/* Step 2 */}
              <Row>
                {/* Step 2 Circle Number */}
                <Cell>
                  <div className="circle-number" style={circleNumberStyles}>
                    <Table
                      className="circle-number-table el-center"
                      align="center"
                      style={circleNumberTableStyles}
                      elements={['row', 'cell']}
                    >
                      2
                    </Table>
                  </div>
                </Cell>

                {/* Step 2 Label */}
                <Cell style={tdPaddingStyles}>
                  <div style={{ lineHeight: '145%', paddingTop: '2px' }}>
                    <span style={stepNumberLabel}>
                      <EditableElement
                        element="b"
                        label="Label for Step 2"
                        onValueChange={(step2Label) => setValue({ ...value, step2Label })}
                        value={value.step2Label}
                      />
                    </span>
                  </div>
                </Cell>
              </Row>

              <Row>
                {/* Step 2 Bar */}
                <Cell align="center">
                  <div
                    className="step-bar"
                    id="step-bar-1-2-or-2-3"
                    style={
                      [DirectiveVariant.StepTwoExpansion].includes(value.variant)
                        ? stepBar12Styles
                        : stepBar23Styles
                    }
                  ></div>
                </Cell>

                {/* Step 2 Additional Information */}
                {value.showStep2AdditionalContent && (
                  <Cell style={tdPaddingStyles}>
                    <div style={{ lineHeight: '16px' }}>
                      <EditableElement
                        element="span"
                        label="Additional information for Step 2"
                        onValueChange={(step2Additional) => setValue({ ...value, step2Additional })}
                        value={value.step2Additional}
                        style={stepDescriptionStyles}
                      />
                    </div>
                    <div style={spaceStyles}>&nbsp;</div>

                    {[DirectiveVariant.StepTwoExpansion].includes(value.variant) && (
                      <>
                        <EditableElement
                          element="div"
                          label="Tertiary information for Step 2"
                          onValueChange={(step2Tertiary) => setValue({ ...value, step2Tertiary })}
                          value={value.step2Tertiary}
                          style={supportiveInformationStyles}
                        />
                        <div style={spaceStyles}>&nbsp;</div>

                        <EditableElement
                          element="div"
                          label="Case number information"
                          onValueChange={(step2CaseNumber) =>
                            setValue({ ...value, step2CaseNumber })
                          }
                          value={value.step2CaseNumber}
                          style={expansionCaseNumberStyles}
                        />
                        <div style={spaceStyles}>&nbsp;</div>
                      </>
                    )}
                  </Cell>
                )}
              </Row>

              {/* Step 3 */}
              <Row>
                {/* Step 3 Circle Number */}
                <Cell>
                  <div className="circle-number" style={circleNumberStyles}>
                    <Table
                      className="circle-number-table el-center"
                      style={circleNumberTableStyles}
                      align="center"
                      elements={['row', 'cell']}
                    >
                      3
                    </Table>
                  </div>
                </Cell>

                {/* Step 3 Label */}
                <Cell style={tdPaddingStyles}>
                  <div style={{ lineHeight: '175%' }}>
                    <span style={stepNumberLabel}>
                      <EditableElement
                        element="b"
                        label="Label for Step 3"
                        onValueChange={(step3Label) => setValue({ ...value, step3Label })}
                        value={value.step3Label}
                      />
                    </span>
                  </div>
                </Cell>
              </Row>

              {/* Step 3 Additional Information */}
              {value.showStep3AdditionalContent && (
                <Row>
                  <Cell align="center">
                    <div
                      className="step-bar"
                      id="step-bar-2-3"
                      style={{
                        ...stepBar23Styles,
                        background: 'transparent',
                      }}
                    ></div>
                  </Cell>
                  <Cell style={tdPaddingStyles}>
                    <div style={{ lineHeight: '16px' }}>
                      <EditableElement
                        element="span"
                        label="Additional information for Step 3"
                        onValueChange={(step3Additional) => setValue({ ...value, step3Additional })}
                        value={value.step3Additional}
                        style={stepDescriptionStyles}
                      />
                    </div>
                    <div style={spaceStyles}>&nbsp;</div>
                  </Cell>
                </Row>
              )}
            </Row>
          </>
        )}
      </Row>
      <Row>
        <SpacingCell size="large" />
      </Row>
    </>
  )
}

const outerCellStyles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  ...Text.body.main.regular,
}

const directiveLabelStyles: CSSProperties = {
  ...Text.body.main.regular,
  color: Colors.black,
  textAlign: 'left',
}

const circleNumberStyles: CSSProperties = {
  borderWidth: '4px',
  borderStyle: 'solid',
  borderColor: Colors.black,
  borderRadius: '50%',
  textAlign: 'center',
  width: '38px',
  height: '38px',
  margin: 'auto',
}

const circleNumberTableStyles: CSSProperties = {
  ...Text.header.h3.bold,
  color: Colors.black,
  lineHeight: '26px',
  marginTop: '5px',
}

const stepNumberLabel: CSSProperties = {
  ...Text.header.h3.regular,
  color: Colors.black,
  textAlign: 'left',
  margin: 0,
}

const stepDescriptionStyles: CSSProperties = {
  ...Text.body.main.regular,
  color: Colors.black,
  textAlign: 'left',
}

const hrefTextStyles: CSSProperties = {
  ...Text.link.small,
  color: Colors.alert.neutral.dark,
  textAlign: 'left',
}

const spaceStyles: CSSProperties = {
  height: '10px',
  lineHeight: '10px',
  fontSize: '10px',
}

const tdPaddingStyles: CSSProperties = {
  paddingLeft: '18px',
  paddingTop: '5px',
  width: '100%',
}

const grayBar = '#dcdee0'

const stepBar12Styles: CSSProperties = {
  width: '8px',
  height: '180px',
  background: grayBar,
  marginTop: '4px',
  marginBottom: '4px',
}

const stepBar23Styles: CSSProperties = {
  width: '8px',
  height: '50px',
  background: grayBar,
  marginTop: '4px',
  marginBottom: '4px',
}

const getStartedButtonStyles: CSSProperties = {
  backgroundColor: Colors.black,
  borderRadius: 10,
  paddingTop: Spacing.size.medium,
  paddingBottom: Spacing.size.medium,
  paddingLeft: 65,
  paddingRight: 65,
}

const getStartedButtonTextStyles: CSSProperties = {
  color: Colors.white,
  fontWeight: Font.weight.bold,
}

const supportiveInformationStyles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  ...Text.body.tertiary.italic,
  color: Colors.grayDark,
}

const payOnlineBoxStyles: CSSProperties = {
  border: Borders.medium(Colors.alert.warning.light),
  borderRadius: '10px',
  padding: '30px 40px',
}

const alternativePaymentStyles: CSSProperties = {
  ...Text.body.secondary.bold,
}

const expansionCaseNumberStyles: CSSProperties = {
  ...Text.body.secondary.regular,
}
