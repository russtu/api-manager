const connection = require('../../../api/config/mysqlConnection')

const createCoach = async({name, age, country}) => {
  const coach = await connection.query('INSERT INTO coaches ( name, age, country ) VALUES ( ?, ?, ? )', [ name, age, country ])
  return(coach.insertId)
}

module.exports = {
  createCoach
}