const { Router } = require('express');
const { Player, Session } = require('../database/mongo');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responses');
const { MESSAGES } = require('../utils/constant');

const router = Router();

router.get('/', async (req, res) => {

  try {

    const existingSession = await Session.findOne({
      status: 'active'
    });

    if (!existingSession) {
      return sendSuccessResponse(res, {});
    }

    const [playerDetails] = await Player.find({
      _id: {
        "$in": existingSession.player
      }
    });

    return sendSuccessResponse(res, {
      _id: existingSession._id,
      player: playerDetails,
      current_bid: existingSession.currentBid,
      biddingTeamId: existingSession.biddingTeamId,
      status: existingSession.status
    });

  } catch (error) {
    console.error(MESSAGES.ERROR_CONSOLE_LOG_CONTROLLER + 'get session:');
    console.error(error.message);

    sendErrorResponse(res, error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    
    const existingSession = await Session.findOne({ status: 'active' }).lean();

    if (existingSession) {

      const playerDetails = await Player.findById(existingSession.player).lean();
      
      if (!playerDetails) {
        throw new Error('Player not found for active session');
      }

      return sendSuccessResponse(res, {
        _id: existingSession._id,
        player: playerDetails,
        current_bid: existingSession.currentBid,
        biddingTeamId: existingSession.biddingTeamId,
        status: existingSession.status
      });
    }

    const nextPlayer = await Player.findOneAndUpdate(
      { status: 'pending' },
      { $set: { status: 'active' } },
      { new: true, lean: true }
    );

    if (!nextPlayer) return sendSuccessResponse(res, {});

    const session = await Session.create({
      player: nextPlayer._id,
      currentBid: 0,
      status: 'active'
    });
    
    return sendSuccessResponse(res, {
      _id: session._id,
      player: nextPlayer,
      current_bid: session.currentBid,
      biddingTeamId: session.biddingTeamId,
      status: session.status
    });

  } catch (error) {
    console.error(MESSAGES.ERROR_CONSOLE_LOG_CONTROLLER + 'create session:', error.message);
    sendErrorResponse(res, error.message);
  }
});

module.exports = router;