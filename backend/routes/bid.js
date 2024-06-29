const { Router } = require('express');
const { Player, Session, Team } = require('../database/mongo');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responses');
const { MESSAGES } = require('../utils/constant');

const router = Router();

const MINIMUM_INCREASED_BY_BID = 3;
const MAX_PLAYERS = 5;

router.put('/:session_id', async (req, res) => {

  try {

    const { session_id } = req.params;
    const { team_id, amount } = req.body;

    const sessionData = await Session.findOne({
      _id: session_id,
      status: 'active'
    });

    if (!sessionData) throw new Error('no active session found!');

    const teamData = await Team.findOne({
      _id: team_id
    });

    if (!teamData) throw new Error('session data not found!');

    // check if this team can bid for the player

    const teamDataPlayers = await Player.find({
      team_id
    });

    if (teamDataPlayers.length >= MAX_PLAYERS) throw new Error('This team is already completed!');
    if (amount > (teamData.remaining_budget - (5 * (MAX_PLAYERS - teamDataPlayers.length - 1)))) throw new Error('This team has exceeded Maximum limit amount for this session');
    if (amount < sessionData.currentBid + MINIMUM_INCREASED_BY_BID) throw new Error('Increase bid amount');


    await Session.updateOne({
      _id: session_id,
    }, {
      currentBid: Number(amount),
      biddingTeamId: teamData._id
    });

    sendSuccessResponse(res, {});

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_CONTROLLER + 'make bid:');
    console.error(error.message);

    sendErrorResponse(res, error.message);
  }
});

router.put('/:session_id/complete', async (req, res) => {

  try {

    const { session_id } = req.params;
    const { team_id, amount, status } = req.body;

    const sessionData = await Session.findOne({
      _id: session_id,
      status: 'active'
    });

    if (!sessionData) throw new Error('Invalid session Id!');

    const updateObj = { status };

    const updatePlayerObj = { status };

    if(status == 'unsold') {

      await Session.updateOne({
        _id: session_id,
      }, updateObj);
  
      await Player.updateOne({
        _id: sessionData.player,
      }, updatePlayerObj);

      return sendSuccessResponse(res, {});
    }

    const teamData = await Team.findOne({
      _id: team_id
    });

    if (!teamData) throw new Error('Invalid team Id!');

    if (team_id && amount && status == 'sold') {

      updateObj.team_id = team_id;
      updateObj.amount = amount;
      updatePlayerObj.team_id = team_id;
      updatePlayerObj.sold_at = amount;
    }

    await Session.updateOne({
      _id: session_id,
    }, updateObj);

    await Player.updateOne({
      _id: sessionData.player,
    }, updatePlayerObj);

    await Team.updateOne({
      _id: team_id,
    }, {
      remaining_budget: teamData.remaining_budget - amount
    });

    sendSuccessResponse(res, {});

  } catch (error) {

    console.error(MESSAGES.ERROR_CONSOLE_LOG_CONTROLLER + 'complete Bid:');
    console.error(error.message);

    sendErrorResponse(res, error.message);
  }
});

module.exports = router;