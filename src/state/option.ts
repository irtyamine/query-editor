
export type OptionType = 'Variable' | 'Field'

export interface Option {
  text?: string
  value?: string
  type?: OptionType
  group?: string
}
