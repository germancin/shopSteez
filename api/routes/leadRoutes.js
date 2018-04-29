const express = require('express');
const leadController = require('../controllers/leadController');
let appRouter = express.Router();
const jwt = require('../service/auth');

// EndPoint: /api/lead/

appRouter.route('/').get(leadController.getLeads);

appRouter.route('/').post(leadController.createLead);

appRouter.route('/').put(jwt.validateToken, leadController.updateLeads);

appRouter.route('/delete').post(jwt.validateToken, leadController.deleteLeads);

module.exports = appRouter;