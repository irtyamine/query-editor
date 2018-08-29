import * as React from 'react'
import './editor.css'

import { withEditorContext } from '../editor-context/editor-context'
import Enclosure from '../enclosure/enclosure'
import Input from '../input/input'
import Keyword from '../keyword/keyword'
import { EditorConfig } from '../state/editor-config'

export interface Props {
  config: EditorConfig
}
export interface State {
  options: EditorConfig
}

class Editor extends React.PureComponent<Props, State> {

  render() {
    return <div className='qe-editor'>
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
