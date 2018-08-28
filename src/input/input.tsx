import * as React from 'react'
import './input.css'

export interface Props {
  value?: string
  editable?: boolean
  placeholder?: string
}
export interface State { }

export class Input extends React.Component<Props, State> {

  state: State = {}

  onContentChange = (event: any) => {
    const content = event.target.value || ''
    console.log('content', content)
  }

  render() {
    const { value, placeholder, editable } = this.props
    return <span
      contentEditable={editable !== false}
      className='input-node'
      placeholder={placeholder}
      onKeyUp={this.onContentChange}
    />
  }

}
