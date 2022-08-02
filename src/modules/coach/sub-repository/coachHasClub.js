const connection = require('../../../api/config/mysqlConnection')

const coachHasClub = async ({coachId}) => {
  const [result] = await connection.query('SELECT * FROM coaches WHERE id = ? ', [coachId])
  const coachRegistered = !!result.find((coach) => (coach.club_id))
  if (coachRegistered) {
    throw new Error('Entrenador ya registrado en un club. / Coach already registered in a club')
  }
  return
}



module.exports = {
  coachHasClub
}