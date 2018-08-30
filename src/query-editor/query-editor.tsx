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
        { text: 'Arithmetic', type: 'number', group: 'Expression' },
        { text: 'Binary', type: 'boolean', group: 'Expression' },
        { text: 'country', type: 'string', group: 'Field' },
        { text: 'employeeId', type: 'number', group: 'Field' },
        { text: 'userId', type: 'number', group: 'Variable' },
        { text: 'userName', type: 'string', group: 'Variable' },
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
