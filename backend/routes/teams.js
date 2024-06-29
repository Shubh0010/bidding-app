const { Router } = require('express');
const { Team } = require('../database/mongo');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responses');
const { MESSAGES } = require('../utils/constant');

const router = Router();

const TOTAL_PLAYERS = 5;

router.get('/', async (req, res) => {

  try {

    const result = await Team.aggregate([
      {
        $lookup: {
          from: 'players',
          localField: '_id',
          foreignField: 'team_id',
          as: 'players'
        }
      },
      {
        $project: {
          name: 1,
          capitan: 1,
          remaining_budget: 1,
          players_left: { $subtract: [TOTAL_PLAYERS, { $size: '$players' }] },
          max_next_bid: {
            $cond: [
              { $ne: [{ $size: '$players' }, TOTAL_PLAYERS] },
              { $subtract: ['$remaining_budget', { $multiply: [5, { $subtract: [{ $subtract: [TOTAL_PLAYERS, { $size: '$players' }] }, 1] }] }] },
              0
            ]
          }
        }
      }
    ]);

    sendSuccessResponse(res, result);

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_CONTROLLER + 'get all teams:');
    console.error(error.message);

    sendErrorResponse(res, error.message);
  }
});

module.exports = router;