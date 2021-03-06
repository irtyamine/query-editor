import * as React from 'react'
import './input.css'

import { ContextMenu } from '../context-menu/context-menu'
import { DataType } from '../state/data-type'
import { Menu, MenuItem } from '../state/menu'

const KEY_UP = 38
const KEY_DOWN = 40
const KEY_ENTER = 13

export interface Props {
  value?: string
  editable?: boolean
  placeholder?: string
  menu?: Menu
  includeTypes?: DataType[] | Function
  excludeTypes?: DataType[] | Function
  includeGroups?: string[] | Function
  excludeGroups?: string[] | Function
  onChange?: Function
}
export interface State {
  showMenu?: boolean
  value?: string
}

export class Input extends React.Component<Props, State> {

  ref?: HTMLSpanElement | null
  contextMenu?: ContextMenu | null

  state: State = {
    showMenu: false,
    value: '',
  }

  onKeyDown = (event: any) => {
    if (event.which === KEY_UP) {
      this.selectPreviousSuggestion()
    } else if (event.which === KEY_DOWN) {
      this.selectNextSuggestion()
    } else if (event.which === KEY_ENTER) {
      this.selectCurrentSuggestion()
      return false
    }
  }

  onKeyUp = (event: any) => {
    this.setState({ value: event.target.innerText })
  }

  onKeyPress = (event: any) => {
    if (event.which === KEY_ENTER) {
      event.preventDefault()
    }
  }

  onRef = (ref: HTMLSpanElement | null) => {
    this.ref = ref
  }

  onContextMenuRef = (ref: ContextMenu | null) => {
    this.contextMenu = ref
  }

  selectNextSuggestion = () => {
    if (this.contextMenu == undefined) {
      throw new Error('Context menu is not initialized. Can not change suggestion')
    }
    this.contextMenu.selectNext()
  }

  selectCurrentSuggestion = () => {
    if (this.contextMenu == undefined) {
      throw new Error('Context menu is not initialized. Can not change suggestion')
    }
    this.contextMenu.selectCurrent()
  }

  selectPreviousSuggestion = () => {
    if (this.contextMenu == undefined) {
      throw new Error('Context menu is not initialized. Can not change suggestion')
    }
    this.contextMenu.selectPrevious()
  }

  onFocus = () => {
    this.selectAll()
    this.setState({ showMenu: true })
  }

  onBlur = () => {
    this.setState({ showMenu: false })
  }

  selectAll = () => {
    const range = document.createRange()
    range.selectNodeContents(this.ref as HTMLSpanElement)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  }

  onChange = (event: any) => {
    const { onChange } = this.props
    if (typeof onChange === 'function') {
      onChange(event.target.value)
    }
  }

  onSelectMenuItem = (menuItem: MenuItem) => {
    const { onChange } = this.props
    if (typeof onChange === 'function') {
      onChange(menuItem.text)
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps(props: Props) {
    this.setState({ value: props.value })
  }

  render() {
    const { menu, placeholder, includeTypes, excludeTypes, includeGroups, excludeGroups, editable } = this.props
    const { value, showMenu } = this.state
    return <span className='qe-input'>
      <span
        ref={this.onRef}
        contentEditable={editable !== false}
        tabIndex={0}
        className='qe-input-node'
        placeholder={placeholder}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        suppressContentEditableWarning={true}
      >
        {this.props.value}
      </span>
      <ContextMenu
        key={value}
        ref={this.onContextMenuRef}
        menu={menu}
        visible={showMenu}
        searchable={editable !== false}
        searchString={value}
        includeTypes={includeTypes}
        excludeTypes={excludeTypes}
        includeGroups={includeGroups}
        excludeGroups={excludeGroups}
        onSelect={this.onSelectMenuItem}
      />
    </span>
  }

}
