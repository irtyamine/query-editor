import * as React from 'react'
import './query-editor.css'

import { EditorConfig } from '../state/editor-config'

import { EditorContextProvider } from '../editor-context/editor-context'
import Editor from '../editor/editor'
import { Menu } from '../state/menu'

export class QueryEditor extends React.PureComponent<EditorConfig, void> {

  render() {

    const menu: Menu = {
      searchable: true,
      items: [
        { text: 'Arithmetic', type: 'number', group: 'expression' },
        { text: 'Binary', type: 'boolean', group: 'expression' },
        { text: 'country', type: 'string', group: 'variable' },
        { text: 'employeeId', type: 'number', group: 'variable' },
        { text: 'userId', type: 'number', group: 'variable' },
        { text: 'userName', type: 'string', group: 'variable' },
        { text: '=', type: 'operator', group: 'binary operator' },
        { text: '!=', type: 'operator', group: 'binary operator' },
        { text: '>=', type: 'operator', group: 'binary operator' },
        { text: '<=', type: 'operator', group: 'binary operator' },
        { text: '>', type: 'operator', group: 'binary operator' },
        { text: '<', type: 'operator', group: 'binary operator' },
        { text: 'IS NULL', type: 'operator', group: 'binary operator' },
        { text: 'IS NOT NULL', type: 'operator', group: 'binary operator' },
      ],
    }

    const config = {
      ...this.props,
      menu,
    }
    return <EditorContextProvider {...config}>
      <Editor />
    </EditorContextProvider>
  }
}
