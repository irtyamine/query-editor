
import * as React from 'react'

interface Props {
  children?: string
}
interface State { }

export class Keyword extends React.Component<Props, State> {

  render() {
    const { children } = this.props
    return <span className='qe-editor'>
      {children}
    </span>
  }
}
