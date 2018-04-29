const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const server = express();
const config = require('./src/config');
const db = require('./db');
const leadRoutes = require('./api/routes/leadRoutes');
const userRoutes = require('./api/routes/userRoutes');

const port = config.server_port;

// const LeadModel = require('./api/models/leadModel');
// const faker = require('faker');
// faker.seed(88000);
//
// for(let i = 0; i < 4500; ++i) {
//
//     const data ={
//         'name': faker.name.firstName(),
//         'lastname': faker.name.lastName(),
//         'email': faker.internet.email(),
//         'phone': faker.phone.phoneNumberFormat(),
//     };
//
//     const lead = new LeadModel(data);
//
//     LeadModel.find({'email': data.email})
//         .populate()
//         .exec((err, resp) => {
//
//             if(resp.id === undefined){
//
//                 lead.save()
//                     .then(newLead => {
//                         console.log(i);
//                     })
//                     .catch(error => {
//
//                     });
//
//             }else {
//                 console.log('resp:::', resp);
//             }
//
//         });
//
// }

server.use(helmet());
server.use(express.json());

// Adding Headers for requests.
server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `${config.local_host}:${config.app_port}`);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

server.use(cookieParser());
server.use('/api/lead', leadRoutes);
server.use('/api/user', userRoutes);

db.connectTo();

server.listen(port, () => {
    console.log(`Server listening on ${port}`);
});



