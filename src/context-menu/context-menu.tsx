import * as React from 'react'
import { DataType } from '../state/data-type'
import { EditorConfig } from '../state/editor-config'
import { GroupedItem, Menu, MenuItem } from '../state/menu'
import { ContextMenuItem } from './context-menu-item'
import './context-menu.css'

interface Props {
  visible?: boolean
  searchable?: boolean
  menu?: Menu
  config?: EditorConfig
  searchString?: string
  includeTypes?: DataType[] | Function
  excludeTypes?: DataType[] | Function
  includeGroups?: string[] | Function
  excludeGroups?: string[] | Function
  onSelect?: Function
}

interface State {
  groupedItems?: GroupedItem[]
  filteredItems?: MenuItem[]
  selectedIndex?: number
  totalItems?: number
}

export class ContextMenu extends React.Component<Props, State> {

  state: State = {}

  selectNext = () => {
    this.setState(state => ({
      selectedIndex: (state.totalItems == undefined || state.totalItems <= 0) ? 0 :
        (((state.selectedIndex == undefined ? -1 : state.selectedIndex) + 1) % state.totalItems),
    }))
  }

  selectPrevious = () => {
    this.setState(state => ({
      selectedIndex: (state.totalItems == undefined || state.totalItems <= 0) ? 0 :
        ((state.totalItems + ((state.selectedIndex || 0) - 1)) % state.totalItems),
    }))
  }

  selectCurrent = () => {
    const { filteredItems, selectedIndex } = this.state
    const selectedItem = (filteredItems || [])[selectedIndex || 0]
    this.onSelectMenuItem(selectedItem)
  }

  onSelectMenuItem = (menuItem?: MenuItem) => {
    const { onSelect } = this.props
    if (typeof onSelect === 'function' && menuItem != undefined) {
      onSelect(menuItem)
    }
  }

  filterByAllowedTypes = (menu: MenuItem) => {
    const { includeTypes } = this.props
    if (includeTypes == undefined || menu.type == undefined) { return true }
    if (typeof includeTypes === 'function') { return includeTypes(menu) }
    return includeTypes.indexOf(menu.type) >= 0
  }

  filterByDisallowedTypes = (menu: MenuItem) => {
    const { excludeTypes } = this.props
    if (excludeTypes == undefined || menu.type == undefined) { return true }
    if (typeof excludeTypes === 'function') { return !excludeTypes(menu) }
    return excludeTypes.indexOf(menu.type) < 0
  }

  filterByAllowedGroups = (menu: MenuItem) => {
    const { includeGroups } = this.props
    if (includeGroups == undefined || menu.group == undefined) { return true }
    if (typeof includeGroups === 'function') { return includeGroups(menu) }
    return includeGroups.indexOf(menu.group) >= 0
  }

  filterByDisallowedGroups = (menu: MenuItem) => {
    const { excludeGroups } = this.props
    if (excludeGroups == undefined || menu.group == undefined) { return true }
    if (typeof excludeGroups === 'function') { return !excludeGroups(menu) }
    return excludeGroups.indexOf(menu.group) < 0
  }

  filterBySearchString = (menu: MenuItem) => {
    try {
      const { searchString, searchable } = this.props
      if (searchable === false) { return true }
      if (searchString == undefined || menu.text == undefined || menu.text === '') { return true }
      return new RegExp(searchString, 'ig').test(menu.text)
    } catch (e) {
      return false
    }
  }

  reduceByGroup = (groupedItems: GroupedItem[], item: MenuItem, index: number) => {
    let group = groupedItems.find((groupedItem: any) => groupedItem.group === item.group)
    if (group == undefined) {
      group = { group: item.group, items: [] }
      groupedItems.push(group)
    }
    (group.items || []).push({ ...item, index })
    return groupedItems
  }

  processProps = ({ config }: Props) => {
    const { menu } = (config || {}) as EditorConfig

    const filteredItems: MenuItem[] = (menu && menu.items || [])
      .filter(this.filterByAllowedTypes)
      .filter(this.filterByAllowedGroups)
      .filter(this.filterByDisallowedTypes)
      .filter(this.filterByDisallowedGroups)
      .filter(this.filterBySearchString)

    const groupedItems: GroupedItem[] = filteredItems.reduce(this.reduceByGroup, [])

    this.setState({
      groupedItems,
      filteredItems,
      totalItems: filteredItems.length,
    })
  }

  componentDidMount() {
    this.processProps(this.props)
  }

  componentWillReceiveProps(props: Props) {
    this.processProps(props)
  }

  renderMenuItem = (item: MenuItem, index: number) => {
    const { searchString, searchable } = this.props
    const { selectedIndex } = this.state
    return <ContextMenuItem
      key={index}
      searchable={searchable}
      selected={item.index === selectedIndex}
      searchString={searchString}
      menuItem={item}
      onClick={this.onSelectMenuItem}
    />
  }

  render() {
    const { visible } = this.props
    const { groupedItems } = this.state
    const hasContent = groupedItems != undefined && groupedItems.length > 0

    return <div className={`qe-context-menu line-number cursor-line-no-selection ${visible && hasContent ? `open` : ''}`}>
      <div className='gutter'>
        {(groupedItems || []).map((groupedItem: GroupedItem, index: number) => {
          return <React.Fragment key={index}>
            <div className='comment qe-context-menu-title'>{groupedItem.group}</div>
            {(groupedItem.items || []).map(this.renderMenuItem)}
          </React.Fragment>
        })}
      </div>
    </div>
  }
}
