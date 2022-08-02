const connection = require('../../../api/config/mysqlConnection')
let result
const coachExists = async ({name, age, country}) => {
  const [coaches] = await connection.query('SELECT * FROM coaches')
  result = !!coaches.find((coach) => (coach.name === name) && (coach.age == age) && (coach.country === country))
  if (result) {
    throw new Error('Ese entrenador ya existe / That coach already exists ')
  }

  return
}



module.exports = {
  coachExists
}