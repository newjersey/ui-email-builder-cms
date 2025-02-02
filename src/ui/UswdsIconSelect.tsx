import React, { FC, memo } from 'react'
import startCase from 'lodash.startcase'
import { Select, UswdsIcon, UswdsIconVariantKey, UswdsIconVariants } from 'src/ui'

interface UswdsIconSelectProps {
  onChange: (icon: UswdsIconVariantKey) => void
  value: UswdsIconVariantKey
  labelId: string
}

const iconOptions = Object.keys(UswdsIconVariants).map((key) => {
  const icon: UswdsIconVariantKey = key as any
  return {
    label: (
      <span className="uswds-icon-option">
        <UswdsIcon icon={icon} />
        <span className="uswds-icon-label">{startCase(key)}</span>
      </span>
    ),
    value: key,
  }
})

export const UswdsIconSelect: FC<UswdsIconSelectProps> = memo(({ onChange, value, labelId }) => {
  return (
    <Select
      data-testid="uswds-icon-select"
      size="small"
      labelId={labelId}
      options={iconOptions}
      onChange={(value) => onChange(value as UswdsIconVariantKey)}
      value={value}
      renderValue={({ value }) => {
        const icon: UswdsIconVariantKey = value as any
        return (
          <span className="uswds-icon-value">
            <UswdsIcon icon={icon} />
            <span className="uswds-icon-label">{startCase(value ?? '')}</span>
          </span>
        )
      }}
    />
  )
})
