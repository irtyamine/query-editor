import * as React from 'react'
// import '../theme/azure/index.less'
import '../theme/github/index.less'
import './editor.less'

import { withEditorContext } from '../editor-context/editor-context'
import { ExpressionView } from '../expressions/expression-view'
import { EditorConfig } from '../state/editor-config'
import { Expression } from '../state/expression'

export interface Props {
  config: EditorConfig
}
export interface State {
  options: EditorConfig
}

class Editor extends React.PureComponent<Props, State> {

  render() {
    const { config } = this.props
    const { expressions } = (config.grammar || {} as any)

    console.log('expressions', expressions)

    return <div className='qe-editor editor editor-colors'>
      {/* <Enclosure>
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
      </Enclosure> */}
      {(expressions || []).map(this.renderExpression)}
    </div>
  }

  renderExpression(expression: Expression, index: number): any {
    return <ExpressionView
      key={index}
      expression={expression}
    />
  }
}

export default withEditorContext(Editor)
