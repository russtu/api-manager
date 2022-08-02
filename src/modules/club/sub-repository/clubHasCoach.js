const connection = require('../../../api/config/mysqlConnection')
const clubHasCoach = async ({clubId}) => {
  const [result] = await connection.query('SELECT hasCoach FROM clubs WHERE id = ?', [clubId])
  const clubHasCoach = !!result.find((club) => (club.hasCoach === 'true'))
  if (clubHasCoach) {
    throw new Error('El club ya tiene entrenador. / The club already has a couch.')
  }

  return
}



module.exports = {
  clubHasCoach
}