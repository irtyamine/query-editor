import * as React from 'react'
import './context-menu.css'

import { withEditorContext } from '../editor-context/editor-context'
import { EditorConfig } from '../state/editor-config'
import { Menu } from '../state/menu'
import { Theme } from '../state/theme'

interface Props {
  visible?: boolean
  menu?: Menu
  config?: EditorConfig
}
interface State { }

export class ContextMenu extends React.Component<Props, State> {

  render() {
    const { visible, menu, config } = this.props
    const { theme } = (config || {}) as EditorConfig
    const { menuColor, backgroundColor, borderColor } = (theme || {}) as Theme
    return <div
      className={`qe-context-menu ${visible ? `open` : ''}`}
      style={{
        backgroundColor: visible ? menuColor || backgroundColor || 'white' : 'transparent',
        borderColor: visible ? borderColor || 'lightgray' : 'transparent',
      }}
    >
      {menu && menu.items && menu.items.length || 'none'}
    </div>
  }
}

export default withEditorContext(ContextMenu)
