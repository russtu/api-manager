const mysqlClubRepository = require('../../../modules/club/repository/mysqlClubRepository')
const { adjustBudget } = require('../../../modules/club/sub-repository/adjustBudget')
const { coachHasClub } = require('../../../modules/coach/sub-repository/coachHasClub')
const { clubHasCoach } = require('../../../modules/club/sub-repository/clubHasCoach')
const emailSender = require('../../../notifiers/emailSender')
const coachRegisterSchema = require('../../../validationSchemas/coachRegisterSchema')
const { coachIdExists } = require('../../../modules/coach/sub-repository/coachIdExists')
const { clubIdExists } = require('../../../modules/club/sub-repository/clubIdExists')
require('dotenv').config()

const { EMAIL_TO } = process.env



const patchClubCoach = async (req, res) => {
  const { coachId, salary } = req.body
  const { clubId } = req.params

  try {
    await coachRegisterSchema.validateAsync({ salary, coachId })
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
    await coachIdExists({ coachId })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  try {
    await clubHasCoach({ clubId })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  try {
    await coachHasClub({ coachId })
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


  let data
  try {
    data = await mysqlClubRepository.registerCoach({ coachId, salary, clubId })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }


  try {
    emailSender.notifierEmail({ sendTo: EMAIL_TO, type: 'entrenador', situation: 'alta', data })
  } catch (error) {
    res.status(500)
    res.end('Error sending notification email error')
    return
  }

  res.status(200)
  res.send('coach registered Succesfully')
}

module.exports = patchClubCoach