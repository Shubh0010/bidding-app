const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION_STRING);

const sessionSchema = mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  currentBid: Number,
  biddingTeamId: mongoose.Schema.Types.ObjectId,
  status: {
    type: String,
    enum: ['active', 'sold', 'unsold']
  }
});

const playerSchema = mongoose.Schema({
  name: String,
  image: String,
  position: {
    type: String,
    enum: ['FORWARD', 'MIDFIELDER', 'DEFENDER', 'GOALKEEPER']
  },
  status: {
    type: String,
    enum: ['sold', 'unsold', 'pending']
  },
  team_id: mongoose.Schema.Types.ObjectId,
  sold_at: Number
});

const teamSchema = mongoose.Schema({
  name: String,
  capitan: String,
  remaining_budget: Number,
});

const Session = mongoose.model('Session', sessionSchema);
const Player = mongoose.model('Player', playerSchema);
const Team = mongoose.model('Team', teamSchema);

module.exports = {
  Session,
  Player,
  Team,
};