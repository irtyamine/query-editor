import React from 'react'
import ReactDOM from 'react-dom'
import { QueryEditor } from './query-editor/query-editor'
import { EditorConfig } from './state/editor-config'

export class Editor {

  constructor(public options: EditorConfig, public el: HTMLElement | null) {
    this.render(el)
  }

  render(el: HTMLElement | null) {
    if (el === null) { throw new Error(`Editor: Missing container element 'el'!`) }
    ReactDOM.render(React.createElement(QueryEditor as any), el)
  }

}
