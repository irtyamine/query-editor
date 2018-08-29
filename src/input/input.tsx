import * as React from 'react'
import './input.css'

import ContextMenu from '../context-menu/context-menu'
import { withEditorContext } from '../editor-context/editor-context'
import { EditorConfig } from '../state/editor-config'

export interface Props {
  value?: string
  editable?: boolean
  placeholder?: string
  config?: EditorConfig
}
export interface State {
  showMenu?: boolean
}

class Input extends React.Component<Props, State> {

  ref?: HTMLSpanElement | null
  state: State = {
    showMenu: false,
  }

  onContentChange = (event: any) => {
    const content = event.target.value || ''
    console.log('content', content)
  }

  onRef = (ref: HTMLSpanElement | null) => this.ref = ref

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

  render() {
    const { value, placeholder, editable } = this.props
    const { showMenu } = this.state
    return <span className='qe-input'>
      <span
        ref={this.onRef}
        contentEditable={editable !== false}
        className='qe-input-node'
        placeholder={placeholder}
        onKeyUp={this.onContentChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        {value}
      </span>
      <ContextMenu visible={showMenu} />
    </span>
  }

}

export default withEditorContext(Input)
