const connection = require('../../../api/config/mysqlConnection')
let result
const playerExists = async(name, age, country) => {
  const [players] = await connection.query('SELECT * FROM players')
  result = !!players.find((player) => (player.name===name)&&(player.age == age)&&(player.country=== country))

return result
}



module.exports = {
  playerExists
}