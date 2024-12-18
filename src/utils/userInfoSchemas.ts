import { z } from 'zod'
import { STATE_AND_TERRITORY_ABBREVIATIONS } from './statesAndTerritories'
import { RichTextValue } from 'src/ui'

export const bannerSchema = z.object({
  backgroundColor: z.string(),
  primaryText: z.string(),
  primaryLink: z.string(),
  secondaryLink: z.string(),
  visible: z.boolean().optional(),
})

export type BannerValue = z.infer<typeof bannerSchema>

export const departmentSealSchema = z.object({
  seal: z.string(),
  visible: z.boolean().optional(),
})

export type DepartmentSealValue = z.infer<typeof departmentSealSchema>

const stateAbbrevationsSchema = z.enum(STATE_AND_TERRITORY_ABBREVIATIONS)

export const stateSealSchema = z.object({
  stateAbbreviation: stateAbbrevationsSchema,
  additionalDisclaimer: z.string(),
  visible: z.boolean().optional(),
})

export type StateSealValue = z.infer<typeof stateSealSchema>

export const disclaimerSchema = z.object({
  content: z.array(z.any()),
  visible: z.boolean().optional(),
})

// This doesn't use Zod's infer because we don't have
// a Zod schema for RichTextValue right now
export interface DisclaimerValue {
  content: RichTextValue
  visible?: boolean
}
