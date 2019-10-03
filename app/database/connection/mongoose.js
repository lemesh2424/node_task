const mongoose = require('mongoose');
const mongoConfig = require('../../../config/mongo.json');

const { host, port, user, password, db } = mongoConfig;
const mongoURI = `mongodb://${user}:${password}@${host}:${port}/${db}`;

module.exports = mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })