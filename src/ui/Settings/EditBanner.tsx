import React, { FC, useMemo } from 'react'
import { Heading, Paragraph } from 'src/ui/Layout'
import { EditableElement, EmailBlock, Input } from 'src/ui'
import { BannerMarkup, useBannerValue } from 'src/templates/EmailTemplateComponents/Banner'
import { Spacing } from 'src/templates/styles'

export const EditBanner: FC = () => {
  const [banner, setBanner] = useBannerValue()
  const initialBanner = useMemo(() => banner, [])

  return (
    <>
      <Heading element="h2" subheading>
        Banner
      </Heading>
      <Paragraph>At the very top of every email, it will show this:</Paragraph>
      <EmailBlock.Table maxWidth={Spacing.layout.maxWidth}>
        <BannerMarkup
          disableLinks
          primaryLink={banner.primaryLink}
          secondaryLink={banner.secondaryLink}
          primaryText={
            <EditableElement
              element="span"
              label="Primary Text"
              initialValue={initialBanner.primaryText}
              onValueChange={(primaryText) => setBanner({ ...banner, primaryText })}
            />
          }
        />
      </EmailBlock.Table>
      <div className="banner-fields" style={{ maxWidth: Spacing.layout.maxWidth }}>
        <div className="banner-field">
          <label htmlFor="primary-link">Primary Link</label>
          <Input
            id="primary-link"
            value={banner.primaryLink}
            onTextChange={(primaryLink) => setBanner({ ...banner, primaryLink })}
            type="url"
          />
        </div>
        <div className="banner-field">
          <label htmlFor="secondary-link">Secondary Link</label>
          <Input
            id="secondary-link"
            value={banner.secondaryLink}
            onTextChange={(secondaryLink) => setBanner({ ...banner, secondaryLink })}
            type="url"
          />
        </div>
      </div>
    </>
  )
}