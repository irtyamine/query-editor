import * as React from 'react'

interface Props {
  children?: any
}
interface State { }

export default class String extends React.Component<Props, State> {

  render() {
    const { children } = this.props
    return <span className='qe-string string'>
      <span>"</span>
      <span>{children}</span>
      <span>"</span>
    </span>
  }
}
