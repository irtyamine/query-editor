import * as React from 'react'
import { Input } from '../input/input'
import { Option } from '../state/option'

export interface Props {
  options?: Option[]
}
export interface State { }

export class Expression extends React.PureComponent<Props, State> {

  render() {
    return <div className='di'>
      <Input

      />
    </div>
  }
}
