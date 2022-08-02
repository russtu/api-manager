const mysqlClubRepository = require('../../../modules/club/repository/mysqlClubRepository')
const clubShema = require('../../../validationSchemas/clubSchema')
const { clubExists } = require('../../../modules/club/sub-repository/clubExists')

const postClub = async (req, res) => {
  const { name, budget, location } = req.body

  try {
    await clubShema.validateAsync({ name, budget, location })
  } catch (error) {
    res.status(404)
    res.end(error.message)
    return
  }

  try {
    await clubExists({ name, budget, location })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  let club
  try {
    club = await mysqlClubRepository.createClub({ name, budget, location })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }
  res.status(200)
  res.send('Club created Succesfully')
}

module.exports = postClub