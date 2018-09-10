import * as React from 'react'
import './expression-view.css'

import { Enclosure } from '../enclosure/enclosure'
import { Input } from '../input/input'
import { Expression, ExpressionType, Menu } from '../state'

export interface Props {
  expression?: Expression
}
export interface State { }

export interface Renderer {
  [id: string]: Function
}

export function toMenu(expressions?: Expression[]): Menu {
  return {
    items: (expressions || []).map((expression: Expression) => ({
      text: expression.text,
      group: expression.group,
    })),
  }
}

export class ExpressionView extends React.PureComponent<Props, State> {

  renderExpression = (expression: Expression) => {
    return <span>
      {(expression.subExpressions || []).map((subExpression: Expression, index: number) => <ExpressionView
        key={index}
        expression={subExpression}
      />)}
    </span>
  }

  renderInput = (expression: Expression) => {
    return <span className='qe-container'>
      <Input
        placeholder={expression.placeholder || expression.text || 'Expression'}
      />
    </span>
  }

  renderList = (expression: Expression) => {
    return <span className='qe-container'>
      <Input
        value={expression.value}
        editable={false}
        menu={toMenu(expression.subExpressions)}
        placeholder={expression.placeholder || expression.text}
      />
    </span>
  }

  renderer: Renderer = {
    [ExpressionType.Input]: this.renderInput,
    [ExpressionType.List]: this.renderList,
    [ExpressionType.Expression]: this.renderExpression,
  }

  render() {
    const { expression } = this.props
    if (expression == undefined) { return null }
    let content

    console.log('expression', expression)

    const expressionRenderer = (this.renderer[expression.type as any] || this.renderExpression as any)
    content = expressionRenderer(expression)

    if (expression.enclosure != undefined) {
      content = <Enclosure type={expression.enclosure}>{content}</Enclosure>
    }

    return content
  }
}
