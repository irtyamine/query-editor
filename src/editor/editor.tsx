import * as React from 'react'
// import '../theme/azure/index.less'
import '../theme/github/index.less'
import './editor.less'

import { withEditorContext } from '../editor-context/editor-context'
import Enclosure from '../enclosure/enclosure'
import Input from '../input/input'
import Keyword from '../keyword/keyword'
import { EditorConfig } from '../state/editor-config'
import String from '../string/string'
import Variable from '../variable/variable'

export interface Props {
  config: EditorConfig
}
export interface State {
  options: EditorConfig
}

class Editor extends React.PureComponent<Props, State> {

  render() {
    return <div className='qe-editor editor editor-colors'>
      <Enclosure>
        <Variable>
          <Input placeholder='Variable' onChange={console.log} />
        </Variable>
        <Input
          editable={false}
          placeholder='Variable'
          value='='
          onChange={console.log}
          includeTypes={['operator']}
          includeGroups={['binary operator']}
        />
        <String placeholder='Value' />
      </Enclosure>
    </div>
  }
}

export default withEditorContext(Editor)
