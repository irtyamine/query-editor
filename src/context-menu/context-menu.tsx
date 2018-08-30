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

    const menuByType = (menu && menu.items || []).reduce((accumulator: any, item: MenuItem) => {
      let group = accumulator.find((groupItem: any) => groupItem.group === item.group)
      if (group == undefined) {
        group = { group: item.group, items: [] }
        accumulator.push(group)
      }
      group.items.push(item)
      return accumulator
    }, [])

    return <div className={`qe-context-menu line-number cursor-line-no-selection ${visible ? `open` : ''}`}>
      <div className='gutter'>
        {menuByType.map((group: any, index: number) => {
          return <React.Fragment key={index}>
            <div className='comment qe-context-menu-title'>{group.group}</div>
            {group.items.map(this.renderMenuItem)}
          </React.Fragment>
        })}
      </div>
    </div>
  }
}

export default withEditorContext(ContextMenu)
