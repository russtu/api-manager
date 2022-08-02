const mysqlClubRepository = require('../../../modules/club/repository/mysqlClubRepository')


const getClubPlayers = async (req, res) => {
  const { clubId } = req.params
  const { name  } = req.query

  let players
  try {
    players = await mysqlClubRepository.listClubPlayers({ clubId, name })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }
  res.status(200)
  res.send(players)
}
module.exports = getClubPlayers