const mysqlClubRepository = require('../../../modules/club/repository/mysqlClubRepository')
const { coachIdExists } = require('../../../modules/coach/sub-repository/coachIdExists')
const emailSender = require('../../../notifiers/emailSender')
require('dotenv').config()

const { EMAIL_TO } = process.env

const dropCoach = async (req, res) => {
  const { coachId } = req.params


  try {
    await coachIdExists({ coachId })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  try {
    data = await mysqlClubRepository.removeCoach({ coachId })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  try {
    emailSender.notifierEmail({ sendTo: EMAIL_TO, type: 'entrenador', situation: 'baja', data })
  } catch (error) {
    res.status(500)
    res.end('Unexpected error')
    return
  }


  res.status(200)
  res.send('coach removed succesfully')
}
module.exports = dropCoach