const mysqlClubRepository = require('../../../modules/club/repository/mysqlClubRepository')
const { adjustBudget } = require('../../../modules/club/sub-repository/adjustBudget')
const { clubIdExists } = require('../../../modules/club/sub-repository/clubIdExists')
const { playerHasClub } = require('../../../modules/player/sub-repository/playerHasClub')
const { playerIdExists } = require('../../../modules/player/sub-repository/playerIdExists')
const emailSender = require('../../../notifiers/emailSender')
const playerRegisterSchema = require('../../../validationSchemas/playerRegisterSchema')
require('dotenv').config()

const { EMAIL_TO } = process.env



const patchClubPlayer = async (req, res) => {
  const { playerId, salary } = req.body
  const { clubId } = req.params


  try {
    await playerRegisterSchema.validateAsync({ salary, playerId })
  } catch (error) {
    res.status(404)
    res.end(error.message)
    return
  }

  try {
    await clubIdExists({ clubId })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  try {
    await playerIdExists({ playerId })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  try {
    await playerHasClub({ playerId })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  try {
    await adjustBudget({ salary, clubId })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  try {
    data = await mysqlClubRepository.registerPlayer({ playerId, salary, clubId })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  try {
    emailSender.notifierEmail({ sendTo: EMAIL_TO, type: 'jugador', situation: 'alta', data })
  } catch (error) {
    res.status(500)
    res.end('Unexpected error')
    return
  }

  res.status(200)
  res.send('Player registered Succesfully')
}

module.exports = patchClubPlayer