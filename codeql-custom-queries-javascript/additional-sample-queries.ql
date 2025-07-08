/**
 * @name Detect unused variables
 * @kind problem
 * @problem.severity warning
 * @id javascript/example/unused-variables
 */

import javascript

from Variable v
where not exists(v.getAnAccess())
select v, "This variable is unused."

import javascript

from BinaryOperation op
where
  op.getOperator() = "+" and
  op.getLeftOperand() instanceof StringLiteral and
  op.getRightOperand() instanceof StringLiteral
select op, "This is a string concatenation."
