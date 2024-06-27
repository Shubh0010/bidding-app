const { Router } = require('express');

const router = Router();

const playerRouter = require('./players');
const teamRouter = require('./teams');
const bidRouter = require('./bid');
const sessionRouter = require('./session');

router.use('/players', playerRouter);
router.use('/teams', teamRouter);
router.use('/bid', bidRouter);
router.use('/session', sessionRouter);

module.exports = router;