import * as React from 'react'
import './context-menu-item.css'

import { MenuItem } from '../state/menu'

interface Props {
  menuItem?: MenuItem
  onClick?: Function
}

interface State { }

export class ContextMenuItem extends React.Component<Props, State> {

  onClick = () => {
    const { onClick, menuItem } = this.props
    if (typeof onClick === 'function') {
      onClick(menuItem)
    }
  }

  render() {
    const { menuItem } = this.props
    if (menuItem == undefined) { return null }
    return <div className='qe-context-menu-item' onClick={this.onClick} >
      <div className='qe-context-menu-item-background' />
      <div className='qe-context-menu-item-text'>
        {menuItem.text}
      </div>
    </div>
  }
}
