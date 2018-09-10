import { DataType, Editor, EnclosureType, Expression, ExpressionType, Grammar, RepeatType } from '../src/'

function createArithmeticExpression(): Expression {

  return {
    text: 'Arithmetic',
    type: ExpressionType.Expression,
    returnTypes: DataType.Number,
    enclosure: EnclosureType.Bracket,
    subExpressions: [{
      type: ExpressionType.Input,
      returnTypes: DataType.Number,
    }, {
      type: ExpressionType.Expression,
      returnTypes: DataType.Number,
      repeat: RepeatType.OneOrMore,
      subExpressions: [{
        text: '+',
        type: ExpressionType.List,
        subExpressions: [
          { text: '+', type: ExpressionType.Operator, group: 'arithmetic operator' },
          { text: '-', type: ExpressionType.Operator, group: 'arithmetic operator' },
          { text: '*', type: ExpressionType.Operator, group: 'arithmetic operator' },
          { text: '/', type: ExpressionType.Operator, group: 'arithmetic operator' },
          { text: '%', type: ExpressionType.Operator, group: 'arithmetic operator' },
        ],
      }, {
        type: ExpressionType.Input,
        returnTypes: DataType.Number,
      }],
    }],
  }
}

function initialize(el: HTMLElement | null) {

  const ArithmeticExpression = createArithmeticExpression()
  const expressions: Expression[] = [
    ArithmeticExpression,
  ]

  const grammar: Grammar = { expressions }

  const qe = new Editor({ grammar }, el)
  console.log(qe)
}

// startup the project
initialize(document.getElementById('root'))
