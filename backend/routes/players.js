const { Router } = require('express');
const { Player } = require('../database/mongo');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responses');
const { MESSAGES } = require('../utils/constant');

const router = Router();

router.get('/', async (req, res) => {
  try {

    const {s: status} = req.query;

    const playersData = await Player.find({
      status
    });

    sendSuccessResponse(res, playersData);

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_CONTROLLER + 'get all players');
    console.error(error.message);

    sendErrorResponse(res, error.message);
  }
});

module.exports = router;