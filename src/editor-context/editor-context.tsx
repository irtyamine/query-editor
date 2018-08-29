import * as React from 'react'
import { EditorConfig } from '../state/editor-config'

export const defaultConfig: EditorConfig = {}

export const EditorContext = React.createContext(defaultConfig)

export class EditorContextProvider extends React.Component<EditorConfig, EditorConfig> {
  render() {
    return (
      <EditorContext.Provider value={this.props}>
        {this.props.children}
      </EditorContext.Provider>
    )
  }
}

export function withEditorContext(Component: any) {
  return function ThemedComponent(props: any) {
    return (
      <EditorContext.Consumer>
        {config => <Component {...props} config={config} />}
      </EditorContext.Consumer>
    )
  }
}
