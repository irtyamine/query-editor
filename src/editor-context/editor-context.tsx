import * as React from 'react'
import { EditorConfig } from '../state/editor-config'
import { Theme } from '../state/theme'
import * as defaultTheme from '../theme/light.json'

export const defaultConfig: EditorConfig = {
  theme: defaultTheme as Theme,
}

export const EditorContext = React.createContext(defaultConfig)

export class EditorContextProvider extends React.Component<EditorConfig, EditorConfig> {
  state: EditorConfig = defaultConfig

  componentDidMount() {
    const theme: Theme = { ...defaultTheme as Theme, ...this.props.theme }
    this.setState({ ...(this.props as any || {}), theme })
  }

  componentWillReceiveProps(props: EditorConfig) {
    const theme: Theme = { ...defaultTheme as Theme, ...props.theme }
    this.setState({ ...props, theme })
  }

  render() {
    return (
      <EditorContext.Provider value={this.state}>
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
