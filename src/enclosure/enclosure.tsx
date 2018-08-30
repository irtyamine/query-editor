import * as React from 'react'
import './enclosure.css'

interface Props {
  type?: 'bracket' | 'curly' | 'quote' | 'doubleQuote'
}
interface State { }

const tags = {
  bracket: { start: '(', end: ')' },
  curly: { start: `{`, end: `}` },
  quote: { start: `'`, end: `'` },
  doubleQuote: { start: `"`, end: `"` },
}

export default class Enclosure extends React.Component<Props, State> {

  render() {
    const { children } = this.props
    const type = this.props.type || 'bracket'
    const tag = tags[type || 'bracket']
    return <span className='qe-enclosure'>
      <span className='delimiter'>{tag.start}</span>
      <span>{children}</span>
      <span className='delimiter'>{tag.end}</span>
    </span>
  }
}
