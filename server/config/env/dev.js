'use strict';

module.exports = {
	port: process.env.PORT || 5020,
	host: process.env.HOST || '0.0.0.0',
	mongo: {
		host: process.env.MONGO_HOST || '127.0.0.1',
		db: 'PatientData'
	}
};
