import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { EmailTranslation } from 'src/appTypes'

type PreviewTextContextType = [string, (value: string) => void]
const PreviewTextContext = createContext<PreviewTextContextType>(['', () => {}])

interface Props {
  children: ReactNode
  emailTranslation: EmailTranslation.Unique
}

export const PreviewText: FC<Props> = ({ children, emailTranslation }) => {
  const value = useState(emailTranslation.previewText ?? '')
  const [_, setPreviewText] = value

  const { language, previewText } = emailTranslation

  useEffect(() => {
    setPreviewText(previewText ?? '')
  }, [language, setPreviewText, previewText])

  return <PreviewTextContext.Provider value={value}>{children}</PreviewTextContext.Provider>
}

export const usePreviewText = (): PreviewTextContextType => {
  return useContext(PreviewTextContext)
}

export const PreviewTextConsumer = PreviewTextContext.Consumer
