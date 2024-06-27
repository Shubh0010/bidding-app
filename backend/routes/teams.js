const { Router } = require('express');
const { Team, Player } = require('../database/mongo');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responses');
const { MESSAGES } = require('../utils/constant');

const router = Router();

const TOTAL_PLAYERS = 5;
const TOTAL_BUDGET = 100;

router.get('/', async (req, res) => {

  try {

    const teamsData = await Team.find({});

    const result = [];

    for(const team of teamsData) {

      const players = await Player.find({
        team_id: team._id
      });

      result.push({
        _id: team._id,
        name: team.name,
        capitan: team.capitan,
        remaining_budget: team.remaining_budget,
        players_left: TOTAL_PLAYERS - players.length,
        max_next_bid: players.length != 5 ? team.remaining_budget - (5 * (TOTAL_PLAYERS - players.length - 1)) : 0
      })

    }

    sendSuccessResponse(res, result);

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_CONTROLLER + 'get all teams:');
    console.error(error.message);

    sendErrorResponse(res, error.message);
  }
});

module.exports = router;