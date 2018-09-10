import * as React from 'react'
import './query-editor.css'

import { EditorConfig } from '../state/editor-config'

import { EditorContextProvider } from '../editor-context/editor-context'
import Editor from '../editor/editor'

export class QueryEditor extends React.PureComponent<EditorConfig, void> {

  render() {

    // const menu: Menu = {
    //   searchable: true,
    //   items: [
    //     { text: 'Arithmetic', type: DataType.Number, group: 'expression' },
    //     { text: 'Binary', type: DataType.Boolean, group: 'expression' },
    //     { text: 'country', type: DataType.String, group: 'variable' },
    //     { text: 'employeeId', type: DataType.Number, group: 'variable' },
    //     { text: 'userId', type: DataType.Number, group: 'variable' },
    //     { text: 'userName', type: DataType.String, group: 'variable' },
    //     { text: '=', type: DataType.Operator, group: 'binary operator' },
    //     { text: '!=', type: DataType.Operator, group: 'binary operator' },
    //     { text: '>=', type: DataType.Operator, group: 'binary operator' },
    //     { text: '<=', type: DataType.Operator, group: 'binary operator' },
    //     { text: '>', type: DataType.Operator, group: 'binary operator' },
    //     { text: '<', type: DataType.Operator, group: 'binary operator' },
    //     { text: 'IS NULL', type: DataType.Operator, group: 'binary operator' },
    //     { text: 'IS NOT NULL', type: DataType.Operator, group: 'binary operator' },
    //   ],
    // }

    console.log('config!', this.props)
    return <EditorContextProvider {...this.props}>
      <Editor />
    </EditorContextProvider>
  }
}
