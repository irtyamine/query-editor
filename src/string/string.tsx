import * as React from 'react'
import Input from '../input/input'

interface Props {
  placeholder?: any
  children?: any
}
interface State { }

export default class String extends React.Component<Props, State> {

  render() {
    const { placeholder } = this.props
    return <span className='qe-string string'>
      <span>"</span>
      <Input placeholder={placeholder} />
      <span>"</span>
    </span>
  }
}
