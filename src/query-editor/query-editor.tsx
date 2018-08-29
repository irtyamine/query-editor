import * as React from 'react'
import { EditorConfig } from '../state/editor-config'
import './query-editor.css'

import { EditorContextProvider } from '../editor-context/editor-context'
import Editor from '../editor/editor'
import { Menu } from '../state/menu'

export class QueryEditor extends React.PureComponent<EditorConfig, void> {

  render() {

    const menu: Menu = {
      searchable: true,
      items: [
        { text: 'country' },
        { text: 'employeeId' },
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
