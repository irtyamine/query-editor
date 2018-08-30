import { DataType } from './data-type'

export interface Menu {
  searchable?: boolean
  items?: MenuItem[]
}

export interface MenuItem {
  text?: string
  value?: string
  type?: DataType
  group?: string
  index?: number
}

export interface GroupedItem {
  group?: string
  items?: MenuItem[]
}
