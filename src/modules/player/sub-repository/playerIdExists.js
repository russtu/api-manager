const connection = require('../../../api/config/mysqlConnection')

const playerIdExists = async ({playerId}) => {

  const [players] = await connection.query('SELECT * FROM players')
  const playerIdExists = !!players.find((player) => (player.id == playerId))

  if (!playerIdExists) {
    throw new Error('El jugador que has introducido no existen. / The player you entered does not exist')
  }
  return
}


module.exports = {
  playerIdExists
}