import * as React from 'react'
import { EditorConfig } from '../state/editor-config'
import { Theme } from '../state/theme'

import { withEditorContext } from '../editor-context/editor-context'
import { Enclosure } from '../enclosure/enclosure'
import { Input } from '../input/input'
import { Keyword } from '../keyword/keyword'
import './editor.css'

export interface Props {
  config: EditorConfig
}
export interface State {
  options: EditorConfig
}

class Editor extends React.PureComponent<Props, State> {

  render() {
    const { config } = this.props
    const { backgroundColor, textColor } = config.theme as Theme
    return <div
      className='qe-editor'
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <Enclosure>
        <Input placeholder='Variable' />
        <Keyword>=</Keyword>
        <Enclosure type='doubleQuote'>
          <Input placeholder='Value' />
        </Enclosure>
      </Enclosure>
    </div>
  }
}

export default withEditorContext(Editor)
