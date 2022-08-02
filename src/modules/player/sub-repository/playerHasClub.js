const connection = require('../../../api/config/mysqlConnection')
const playerHasClub = async ({playerId}) => {

  const [result] = await connection.query('SELECT * FROM players WHERE id = ?', [playerId])
  const playerRegistered = !!result.find((player) => (player.club_id))

  if (playerRegistered) {
    throw new Error('Jugador ya registrado en un club. / Player already registered in a club')
  }
  return
}



module.exports = {
  playerHasClub
}