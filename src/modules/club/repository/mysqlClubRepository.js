const connection = require('../../../api/config/mysqlConnection')

const listClubPlayers = async ({clubId, name }) => {
  let players
  if (name) {
    players = await connection.query('SELECT * FROM players WHERE club_id = ? AND name = ?', [clubId, name])
  } else {
    players = await connection.query('SELECT * FROM players WHERE club_id = ?', [clubId])
  }
  return players[0]
}

const createClub = async ({name, budget, location}) => {
  const club = await connection.query('INSERT INTO clubs ( name, budget, principalBudget, location ) VALUES ( ?, ?, ?, ? )', [name, budget, budget, location])

  return (club.insertId)
}

const registerCoach = async ({coachId, salary, clubId}) => {
  const [[name]] = await connection.query('SELECT name FROM coaches WHERE id = ?', [coachId])
  const [[club]] = await connection.query('SELECT name FROM clubs WHERE id = ?', [clubId])
  await connection.query('UPDATE coaches SET club_id = ?, salary = ? WHERE id = ?', [clubId, salary, coachId])
  await connection.query('UPDATE clubs SET hasCoach = ? WHERE id = ?', ['true',clubId])
  return ({ name: name.name, club: club.name })
}

const registerPlayer = async ({playerId, salary, clubId}) => {

  const [[name]] = await connection.query('SELECT name FROM players WHERE id = ?', [playerId])
  const [[club]] = await connection.query('SELECT name FROM clubs WHERE id = ?', [clubId])
  await connection.query('UPDATE players SET club_id = ?, salary = ? WHERE id = ?', [clubId, salary, playerId])
  return ({ name: name.name, club: club.name })
}

const adjustPrincipalBudget = async ({newBudget, clubId}) => {
  const budget = await connection.query('SELECT principalBudget, budget FROM clubs WHERE id = ?', [clubId])
  let actualBudget = (budget[0][0].budget)
  let principalBudget = (budget[0][0].principalBudget)

  differenceInPrincipalBudgets = principalBudget - newBudget

  if (differenceInPrincipalBudgets < 0) {
    differenceInPrincipalBudgets = differenceInPrincipalBudgets * -1
  }
  if (newBudget > principalBudget) {
    newActualBudget = actualBudget + differenceInPrincipalBudgets
  } else {
    newActualBudget = actualBudget - differenceInPrincipalBudgets
  }

  await connection.query('UPDATE clubs SET budget = ?, principalBudget = ? WHERE id = ?', [newActualBudget, newBudget, clubId])
  return
}

const removeCoach = async ({coachId}) => {
  const [getSalaryAndClubCoach] = await connection.query('SELECT name, salary, club_id FROM coaches WHERE id = ?', [coachId])
  await connection.query('UPDATE clubs SET budget=budget + ? WHERE id = ?', [getSalaryAndClubCoach[0].salary, getSalaryAndClubCoach[0].club_id])
  const [clubName] = await connection.query('SELECT name FROM clubs WHERE id = ?', [getSalaryAndClubCoach[0].club_id])
  await connection.query('UPDATE coaches SET club_id = ?, salary = ?  WHERE id = ?', [null, null, coachId])
  await connection.query('UPDATE clubs SET hasCoach = ? WHERE id = ?', ['false',getSalaryAndClubCoach[0].club_id])
  const name = getSalaryAndClubCoach[0].name
  const club = clubName[0].name

  return ({ name, club })
}
const removePlayer = async ({playerId}) => {
  const [getSalaryAndClubPlayer] = await connection.query('SELECT name, salary, club_id FROM players WHERE id = ?', [playerId])
  await connection.query('UPDATE clubs SET budget=budget + ? WHERE id = ?', [getSalaryAndClubPlayer[0].salary, getSalaryAndClubPlayer[0].club_id])
  const [clubName] = await connection.query('SELECT name FROM clubs WHERE id = ?', [getSalaryAndClubPlayer[0].club_id])
  await connection.query('UPDATE players SET club_id = ?, salary = ? WHERE id = ?', [null, null, playerId])
  const name = getSalaryAndClubPlayer[0].name
  const club = clubName[0].name

  return ({ name, club })
}


module.exports = {
  listClubPlayers,
  createClub,
  registerCoach,
  registerPlayer,
  adjustPrincipalBudget,
  removeCoach,
  removePlayer
}