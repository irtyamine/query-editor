import * as React from 'react'
import { EnclosureType } from '../state'
import './enclosure.css'

interface Props {
  type?: EnclosureType
}
interface State { }

const tags = {
  bracket: { start: '(', end: ')' },
  curly: { start: `{`, end: `}` },
  singleQuote: { start: `'`, end: `'` },
  doubleQuote: { start: `"`, end: `"` },
}

export class Enclosure extends React.Component<Props, State> {

  render() {
    const { children } = this.props
    const type = this.props.type || 'bracket'
    const tag = tags[type || EnclosureType.Bracket]
    const theme = (type === EnclosureType.SingleQuote || type === EnclosureType.DoubleQuote) ? 'string' : 'delimiter'
    return <span className='qe-enclosure'>
      <span className={theme}>{tag.start}</span>
      <span>{children}</span>
      <span className={theme}>{tag.end}</span>
    </span>
  }
}
