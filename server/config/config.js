'use strict';

var _ = require('lodash')

module.exports = _.extend(
	require('./env/' + process.env.NODE_ENV) || {}
);
