const mysqlPlayerRepository = require('../../../modules/player/repository/mysqlPlayerRepository')
const { playerExists } = require('../../../modules/player/sub-repository/playerExists')
const playerCreateSchema = require('../../../validationSchemas/playerCreateSchema')


const postPlayer = async (req, res) => {
  const { name, age, country } = req.body

  try {
    await playerCreateSchema.validateAsync({ name, age, country})
  } catch (error) {
    res.status(404)
    res.end(error.message)
    return
  }

  let result
  try {
    result = await playerExists(name, age, country)
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }

  let player
  try {
    if (!result) {
      player = await mysqlPlayerRepository.createPlayer(name, age, country)
    }else {
      throw new Error('Ese jugador ya existe / That player already exists ');
    }
  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }
  res.status(200)
  res.send('Player created Succesfully')
}

module.exports = postPlayer