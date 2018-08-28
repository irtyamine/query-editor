import * as React from 'react'
import { EditorConfig } from '../state/editor-config'

import { EditorContextProvider } from '../editor-context/editor-context'
import Editor from '../editor/editor'
import './query-editor.css'

export class QueryEditor extends React.PureComponent<EditorConfig, void> {

  render() {
    return <EditorContextProvider {...this.props}>
      <Editor />
    </EditorContextProvider>
  }
}
