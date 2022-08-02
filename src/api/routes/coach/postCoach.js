const mysqlCoachRepository = require('../../../modules/coach/repository/mysqlCoachRepository')
const { coachExists } = require('../../../modules/coach/sub-repository/coachExists')
const coachCreateSchema = require('../../../validationSchemas/coachCreateSchema')

const postCoach = async (req, res) => {
  const { name, age, country } = req.body

  try {
    await coachCreateSchema.validateAsync({ name, age, country })
  } catch (error) {
    res.status(404)
    res.end(error.message)
    return
  }


  let result
  try {
    await coachExists({ name, age, country })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  let coach
  try {
    coach = await mysqlCoachRepository.createCoach({name, age, country})
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }
  res.status(200)
  res.send('Coach created Succesfully')
}

module.exports = postCoach