import React, { FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Borders, Spacing, SpacingCell, StyleDefaults, Text } from '../styles'
import { EmailBlock } from 'src/ui/EmailBlock'
import { BoxColor, BoxColorConfigs } from 'src/ui/SelectBoxColor'
import { UswdsIcon, UswdsIconVariantKey } from 'src/ui/UswdsIcon'

interface BenefitAmountValue {
  title: string
  description: string
  boxColor: BoxColor
  icon: UswdsIconVariantKey
  boxTitle: string
  weeklyRateLabel: string
  weeklyRateValue: string
  partialWeeklyRateLabel: string
  partialWeeklyRateValue: string
  rateExplanation: string
  rateSupportiveInformation: string
  benefitSupportiveInformation: string
}

const defaultValue: BenefitAmountValue = {
  title: 'Your Benefit Details',
  description:
    'A detailed breakdown of your benefit and how we got to that number will be mailed to you. If you disagree with it, appeal rights and processes are available.',
  boxColor: BoxColor.GrantedGreen,
  icon: 'CreditCard',
  boxTitle: 'Benefit Amount',
  weeklyRateLabel: 'Weekly Rate:',
  weeklyRateValue: '$400',
  partialWeeklyRateLabel: 'Partial Weekly Rate:',
  partialWeeklyRateValue: '$480',
  rateExplanation: 'This rate includes an increase for dependency benefits',
  rateSupportiveInformation:
    'This amount is subject to change based on the submitted tax record or dependency documents you send in',
  benefitSupportiveInformation:
    'If you&rsquo;re working part-time, a partial weekly rate (which is 20% higher than your weekly rate) will be used to calculate your benefit amount.',
}

export const useBenefitAmountValue = (componentId: string, id: string) => {
  return useEmailPartsContentForSubComponent(componentId, id, defaultValue)
}

const { Row, Cell } = EmailBlock

export const BenefitAmount: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue] = useEmailPartsContentForSubComponent(componentId, id, defaultValue)

  const boxColorConfig = BoxColorConfigs[value.boxColor]

  return (
    <>
      <Row elements={['cell', 'table']} onClick={activate}>
        <Row
          elements={[
            { part: 'cell', style: styles.outerCell, className: StyleDefaults.layout.wide },
            'table',
          ]}
        >
          <Row>
            <EditableElement
              aria-level={2}
              element="td"
              value={value.title}
              label="Benefit Amount title"
              onValueChange={(title) => setValue({ ...value, title })}
              role="heading"
              style={styles.title}
            />
          </Row>

          <Row>
            <EditableElement
              aria-level={3}
              element="td"
              value={value.description}
              label="Benefit Amount description"
              onValueChange={(description) => setValue({ ...value, description })}
              role="text"
              style={styles.description}
            />
          </Row>

          <Row
            elements={[
              {
                part: 'cell',
                style: {
                  ...styles.innerCell,
                  backgroundColor: boxColorConfig.backgroundColor,
                  borderLeft: Borders.large(boxColorConfig.accentColor),
                },
              },
              'table',
            ]}
          >
            <Row>
              <Cell style={styles.iconContainer} align="left">
                <UswdsIcon icon={value.icon} />
              </Cell>
              <Cell align="left">
                <EditableElement
                  avia-level={4}
                  element="div"
                  value={value.boxTitle}
                  label="Benefit Amount box title"
                  onValueChange={(boxTitle) => setValue({ ...value, boxTitle })}
                  role="heading"
                  style={styles.boxTitle}
                />
              </Cell>
            </Row>
            <Row>
              <Cell>{null}</Cell>
              <Cell align="left" elements={['table']}>
                <Row>
                  <Cell>
                    <EditableElement
                      aria-level={5}
                      element="span"
                      value={value.weeklyRateLabel}
                      label="Benefit Amount weekly rate label"
                      onValueChange={(weeklyRateLabel) => setValue({ ...value, weeklyRateLabel })}
                      role="heading"
                      style={{ fontWeight: 'bold' }}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <EditableElement
                      aria-level={5}
                      element="span"
                      value={value.weeklyRateValue}
                      label="Benefit Amount weekly rate value"
                      onValueChange={(weeklyRateValue) => setValue({ ...value, weeklyRateValue })}
                      role="heading"
                      style={{ fontWeight: 'bold' }}
                    />
                  </Cell>
                </Row>
                <Row>
                  <Cell style={{ fontWeight: 'bold', paddingBottom: Spacing.size.medium }}>
                    <EditableElement
                      aria-level={5}
                      element="span"
                      value={value.partialWeeklyRateLabel}
                      label="Benefit Amount partial weekly rate label"
                      onValueChange={(partialWeeklyRateLabel) =>
                        setValue({ ...value, partialWeeklyRateLabel })
                      }
                      role="heading"
                      style={{ fontWeight: 'bold' }}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <EditableElement
                      aria-level={5}
                      element="span"
                      value={value.partialWeeklyRateValue}
                      label="Benefit Amount partial weekly rate value"
                      onValueChange={(partialWeeklyRateValue) =>
                        setValue({ ...value, partialWeeklyRateValue })
                      }
                      role="heading"
                      style={{ fontWeight: 'bold' }}
                    />
                  </Cell>
                </Row>
                <Row>
                  <Cell
                    style={{
                      fontWeight: 'bold',
                      fontStyle: 'italic',
                      paddingBottom: Spacing.size.medium,
                    }}
                  >
                    <EditableElement
                      aria-level={5}
                      element="span"
                      value={value.rateExplanation}
                      label="Benefit Amount rate explanation"
                      onValueChange={(rateExplanation) => setValue({ ...value, rateExplanation })}
                      role="heading"
                      style={{ fontWeight: 'bold' }}
                    />
                  </Cell>
                </Row>
                <Row>
                  <Cell style={{ fontStyle: 'italic' }}>
                    <EditableElement
                      aria-level={5}
                      element="span"
                      value={value.rateSupportiveInformation}
                      label="Benefit Amount rate supportive information"
                      onValueChange={(rateSupportiveInformation) =>
                        setValue({ ...value, rateSupportiveInformation })
                      }
                      role="heading"
                      style={{ fontWeight: 'bold' }}
                    />
                  </Cell>
                </Row>
              </Cell>
            </Row>
          </Row>

          <Row>
            <EditableElement
              aria-level={3}
              element="td"
              value={value.benefitSupportiveInformation}
              label="Benefit Amount supportive information"
              onValueChange={(benefitSupportiveInformation) =>
                setValue({ ...value, benefitSupportiveInformation })
              }
              role="text"
              style={{ paddingTop: Spacing.size.medium, fontStyle: 'italic' }}
            />
          </Row>
        </Row>
      </Row>
      <Row>
        <SpacingCell size="large" />
      </Row>
    </>
  )
}

const styles = {
  outerCell: {
    ...StyleDefaults.inline.colors,
  } as CSSProperties,
  innerCell: {
    paddingLeft: Spacing.size.medium,
    paddingRight: Spacing.size.medium,
    paddingBottom: Spacing.size.medium,
    paddingTop: 0,
  } as CSSProperties,
  title: {
    ...Text.header.h2.bold,
    paddingBottom: Spacing.size.small,
  } as CSSProperties,
  description: {
    ...Text.body.main,
    paddingBottom: Spacing.size.medium,
  } as CSSProperties,
  iconContainer: {
    paddingRight: Spacing.size.medium,
    paddingTop: Spacing.size.medium,
  } as CSSProperties,
  boxTitle: {
    ...Text.header.h3.bold,
    paddingTop: Spacing.size.medium,
    lineHeight: '1',
  } as CSSProperties,
}
