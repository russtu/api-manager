const connection = require('../../../api/config/mysqlConnection')

const clubIdExists = async ({ clubId }) => {

  const [clubs] = await connection.query('SELECT * FROM clubs')
  const clubIdExists = !!clubs.find((club) => (club.id == clubId))

  if (!clubIdExists) {
    throw new Error('El club que has introducido no existe. / The club you entered does not exist')
  }
  return

}

module.exports = {
  clubIdExists
}