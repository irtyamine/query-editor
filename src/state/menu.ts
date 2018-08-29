
export type MenuType = 'Variable' | 'Field'

export interface Menu {
  searchable?: boolean
  items?: MenuItem[]
}

export interface MenuItem {
  text?: string
  value?: string
  type?: MenuType
  group?: string
}
