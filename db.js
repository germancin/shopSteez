const MongoClient = require('mongodb').MongoClient;
const config = require('./src/config');

module.exports = {
    connectTo: function (uri = config.mongo_uri) {
        return MongoClient.connect(uri, function(err, db) {
            if (err) {
                throw err;
            } else {
                db.db(config.db_name);
                console.log(`Successfully Connected to MongoDb: ${config.db_name}`);
            }

            db.close();
        })
    },
};
