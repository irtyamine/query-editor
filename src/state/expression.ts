import { DataType } from './data-type'
import { EnclosureType } from './enclosure-type'
import { ExpressionType } from './expression-type'
import { RepeatType } from './repeat-type'

export interface Expression {
  text?: string
  value?: string
  placeholder?: string
  type: ExpressionType | ExpressionType[]
  group?: string
  enclosure?: EnclosureType
  returnTypes?: DataType | DataType[]
  subExpressions?: Expression[]
  repeat?: RepeatType | number
  exportable?: boolean
}
