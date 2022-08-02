const mysqlClubRepository = require('../../../modules/club/repository/mysqlClubRepository')
const { clubIdExists } = require('../../../modules/club/sub-repository/clubIdExists')
const budgetSchema = require('../../../validationSchemas/budgetSchema')

const patchBudget = async (req, res) => {
  const { clubId } = req.params
  const { newBudget } = req.body

  try {
    await budgetSchema.validateAsync({ newBudget })
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
    await mysqlClubRepository.adjustPrincipalBudget({ newBudget, clubId })
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }


  res.status(200)
  res.send('Budget modified Succesfully')
}

module.exports = patchBudget