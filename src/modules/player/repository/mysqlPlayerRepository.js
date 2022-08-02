const connection = require('../../../api/config/mysqlConnection')

const createPlayer = async( name, age, country ) => {
  const player = await connection.query('INSERT INTO players ( name, age, country ) VALUES ( ?, ?, ? )', [ name, age, country])
  return(player.insertId)
}

module.exports = {
  createPlayer
}