const mysqlClubRepository = require('../../../modules/club/repository/mysqlClubRepository')
const { playerIdExists } = require('../../../modules/player/sub-repository/playerIdExists')
const emailSender = require('../../../notifiers/emailSender')
require('dotenv').config()

const { EMAIL_TO } = process.env


const dropPlayer = async (req, res) => {
  const { playerId } = req.params


  try {
    await playerIdExists({ playerId })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  try {
    data = await mysqlClubRepository.removePlayer({ playerId })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  try {
    emailSender.notifierEmail({ sendTo: EMAIL_TO, type: 'jugador', situation: 'baja', data })
  } catch (error) {
    res.status(500)
    res.end('Unexpected error')
    return
  }



  res.status(200)
  res.send('player removed succesfully')
}
module.exports = dropPlayer