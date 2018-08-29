
import * as React from 'react'
import './keyword.css'

interface Props {
  children?: string
}
interface State { }

export default class Keyword extends React.Component<Props, State> {

  render() {
    const { children } = this.props
    return <span className='qe-editor'>
      {children}
    </span>
  }
}
