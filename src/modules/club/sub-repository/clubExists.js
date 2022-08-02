const connection = require('../../../api/config/mysqlConnection')

const clubExists = async ({ name, budget, location }) => {
  const [clubs] = await connection.query('SELECT * FROM clubs ')
  
  const result = !!clubs.find((club) => ((club.name === name) && (club.principalBudget == budget) && (club.location === location)))
  if (result) {
    throw new Error ('Ese club ya existe / That club already exists')
  }
  return
}



module.exports = {
  clubExists
}