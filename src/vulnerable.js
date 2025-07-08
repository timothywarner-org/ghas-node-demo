
// VULNERABLE CODE - FOR DEMO PURPOSES ONLY
function processUserInput(userInput) {
  // This is intentionally vulnerable for GHAS demo
  return eval(userInput); // ⚠️ SECURITY RISK: eval() with user input
}

function sqlQuery(userId) {
  // This is intentionally vulnerable for GHAS demo
  const query = `SELECT * FROM users WHERE id = ${userId}`; // ⚠️ SQL Injection risk
  return query;
}

module.exports = { processUserInput, sqlQuery };
