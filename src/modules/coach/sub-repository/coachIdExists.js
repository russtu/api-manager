const connection = require('../../../api/config/mysqlConnection')

const coachIdExists = async ({coachId}) => {
  const [coaches] = await connection.query('SELECT * FROM coaches')

  const coachIdExists = !!coaches.find((coach) => (coach.id == coachId))

  if (!coachIdExists ) {
    throw new Error('El entrenador que has introducido no existen. / The coach you entered does not exist')
  }
  return

  }


module.exports = {
  coachIdExists
}