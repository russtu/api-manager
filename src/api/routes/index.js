const express = require('express')

const router = require('express').Router()

const { getClubPlayers, postClub, patchClubPlayer, patchClubCoach, patchBudget, dropPlayer, dropCoach } = require ('./club')
const { postCoach } = require ('./coach/')
const { postPlayer } = require  ('./player/')

//CLUB

///LIST PLAYERS OF A CLUB

router.get('/club/:clubId/players', getClubPlayers)


///ADD A CLUB

router.post('/club/add', postClub)

//ADD A PLAYER TO A CLUB

router.patch('/club/:clubId/addPlayer', patchClubPlayer)

//ADD A COACH TO A CLUB

router.patch('/club/:clubId/addCoach', patchClubCoach)


///EDIT BUDGET

router.patch('/club/:clubId/editBudget', patchBudget)

///DROP A PLAYER FROM CLUB

router.patch('/club/dropPlayer/:playerId', dropPlayer)

///DROP A COACH FROM CLUB

router.patch('/club/dropCoach/:coachId', dropCoach)

//PLAYER

///ADD A PLAYER

router.post('/player/add', postPlayer)

//COACH

///ADD A COACH

router.post('/coach/add', postCoach)

module.exports = router