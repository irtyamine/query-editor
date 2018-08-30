import * as React from 'react'
import './context-menu-item.css'

import { MenuItem } from '../state/menu'

interface Props {
  searchable?: boolean
  selected?: boolean
  menuItem?: MenuItem
  searchString?: string
  onClick?: Function
}

interface State {
  isHovering?: boolean
}

export class ContextMenuItem extends React.Component<Props, State> {

  state: State = {}

  onClick = () => {
    const { onClick, menuItem } = this.props
    if (typeof onClick === 'function') {
      onClick(menuItem)
    }
  }

  onHoverStart = () => {
    this.setState({ isHovering: true })
  }

  onHoverEnd = () => {
    this.setState({ isHovering: false })
  }

  renderDecoratedText = (text?: string) => {
    const { searchString, searchable } = this.props
    if (searchable === false) { return text }
    if (text == undefined || searchString == undefined || searchString === '') { return text }
    try {
      const [content, before, highlight, after] = new RegExp(`(.*)(${searchString})(.*)`, 'i').exec(text) || [] as any
      return <span className='selection'>
        <span className='variable'>{before}</span>
        <span className='region'>{highlight}</span>
        <span className='variable'>{after}</span>
      </span>
      return text
    } catch (e) {
      return text
    }
  }

  render() {
    const { menuItem, selected } = this.props
    const { isHovering } = this.state
    if (menuItem == undefined) { return null }
    return <div
      className={`qe-context-menu-item ${selected || isHovering ? 'selection' : ''}`}
      onClick={this.onClick}
      onMouseEnter={this.onHoverStart}
      onMouseLeave={this.onHoverEnd}
    >
      <div className='qe-context-menu-item-text region'>
        {this.renderDecoratedText(menuItem.text)}
      </div>
    </div>
  }
}
