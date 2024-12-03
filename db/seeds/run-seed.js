const db = require('../connection.js');
const data = require('../data/index.js');
const seed = require('./seed.js');

const runSeed = () => {
  return seed(data).then(() => db.end());
};

runSeed();