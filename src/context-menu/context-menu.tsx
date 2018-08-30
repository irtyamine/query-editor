import * as React from 'react'
import './context-menu.css'

import { withEditorContext } from '../editor-context/editor-context'
import { EditorConfig } from '../state/editor-config'
import { Menu, MenuItem } from '../state/menu'
import { ContextMenuItem } from './context-menu-item'

interface Props {
  visible?: boolean
  menu?: Menu
  config?: EditorConfig
}
interface State { }

export class ContextMenu extends React.Component<Props, State> {

  renderMenuItem = (item: MenuItem, index: number) => {
    return <ContextMenuItem key={index} menuItem={item} />
  }

  render() {
    const { visible, config } = this.props
    const { menu } = (config || {}) as EditorConfig
    return <div className={`qe-context-menu line-number cursor-line-no-selection ${visible ? `open` : ''}`}>
      <div className='gutter'>
        {(menu && menu.items || []).map(this.renderMenuItem)}
      </div>
    </div>
  }
}

export default withEditorContext(ContextMenu)
