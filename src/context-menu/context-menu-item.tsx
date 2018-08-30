import * as React from 'react'
import './context-menu-item.css'

import { MenuItem } from '../state/menu'

interface Props {
  menuItem?: MenuItem
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

  render() {
    const { menuItem } = this.props
    const { isHovering } = this.state
    if (menuItem == undefined) { return null }
    return <div
      className={`qe-context-menu-item ${isHovering ? 'selection' : ''}`}
      onClick={this.onClick}
      onMouseEnter={this.onHoverStart}
      onMouseLeave={this.onHoverEnd}
    >
      <div className='qe-context-menu-item-text region'>
        {menuItem.text}
      </div>
    </div>
  }
}
