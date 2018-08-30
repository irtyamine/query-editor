import * as React from 'react'

interface Props {
  children?: any
}
interface State { }

export default class Variable extends React.Component<Props, State> {

  render() {
    const { children } = this.props
    return <span className='qe-variable variable'>
      <span>{children}</span>
    </span>
  }
}
