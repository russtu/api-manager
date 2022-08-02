const connection = require('../../../api/config/mysqlConnection')

const adjustBudget = async ({ salary, clubId }) => {

  const budget = await connection.query('SELECT budget FROM clubs WHERE id = ?', [clubId])
  let oldBudget = (budget[0][0].budget)
  let newBudget = oldBudget - salary
  await connection.query('UPDATE clubs SET budget = ? WHERE id = ?', [newBudget, clubId])

  return
}



module.exports = {
  adjustBudget
}