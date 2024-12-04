import { TranslationLinksValue } from 'src/appTypes'

export const defaultTranslationLinksValue: TranslationLinksValue = {
  languages: {
    english: { text: 'English' },
    spanish: { text: 'Español', href: 'http://example.org/' },
  },
}
