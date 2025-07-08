/**
 * @name Fake Stripe API Key Detection
 * @description Detects fake Stripe API keys used for demo purposes
 * @kind problem
 * @id js/fake-stripe-key
 * @problem.severity warning
 * @precision high
 * @tags security
 *       external/cwe/cwe-532
 */

import javascript

/**
 * A fake Stripe API key pattern for demo purposes
 */
class FakeStripeKey extends DataFlow::Node {
  FakeStripeKey() {
    exists(string literal |
      literal = this.asExpr().(StringLiteral).getStringValue() and
      literal.matches("%sk_test_%") and
      literal.length() > 20
    )
  }
}

/**
 * A variable declaration that contains a fake Stripe API key
 */
class FakeStripeKeyVariable extends DataFlow::Node {
  FakeStripeKeyVariable() {
    exists(VariableDeclarator vd |
      vd.getAnInitializer() = this and
      this instanceof FakeStripeKey
    )
  }
}

from FakeStripeKeyVariable key
select key, "Demo: Fake Stripe API key detected. This is for GHAS demonstration purposes only."
