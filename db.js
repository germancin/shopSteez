const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const MongoClient = require('mongodb').MongoClient;
const config = require('./src/config');



const options = {
    autoReconnect: true
};

module.exports = {
    connectTo: function (uri = config.mongo_uri) {
        return mongoose.connect(`${uri}`, options)
            .then(conn => console.log(`Connected to MongoDB DB:${config.db_name}`))
            .catch(err => {
                return err;
            });
    },
};


// module.exports = {
//     connectTo: function (uri = config.mongo_uri) {
//         return MongoClient.connect(uri, function(err, db) {
//             if (err) {
//                 throw err;
//             } else {
//                 db.db(config.db_name);
//                 console.log(`Successfully Connected to MongoDb: ${config.db_name}`);
//             }
//
//             db.close();
//         })
//     },
// };
