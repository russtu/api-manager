const getClubPlayers = require('./getClubPlayers')
const postClub = require('./postClub')
const patchClubCoach = require('./patchClubCoach')
const patchClubPlayer = require('./patchClubPlayer')
const patchBudget = require('./patchBudget')
const dropCoach = require('./dropCoach')
const dropPlayer = require('./dropPlayer')

module.exports = {
  getClubPlayers,
  postClub,
  patchClubCoach,
  patchClubPlayer,
  patchBudget,
  dropCoach,
  dropPlayer
}