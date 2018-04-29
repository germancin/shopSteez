const LeadModel = require('../models/leadModel');

const createLead = (req, res) => {
    const lead = new LeadModel(req.body);

    lead.save()
        .then(newLead => {
            res.status(200).send(newLead)
        })
        .catch(error => {

            if(error.code === 11000){
                res.status(400).send({error:error, type:'duplicate' });
            }else{
                res.status(400).send({error:error, type:'regular'});
            }

        });
};

const getLeads = (req, res) => {
    LeadModel.find({})
        .populate()
        .exec((err, resp) => {
            res.status(200).send(resp);
        });
};

const updateLeads = (req, res) => {
    const {_id} = req.body;
    LeadModel.update({'_id':_id}, req.body)
        .populate()
        .exec((err, resp) => {
            res.status(200).send(resp);
        });
};

const deleteLeads = (req, res) => {
    const ids = req.body;

    if (ids.length > 0) {
        LeadModel.remove({'_id': { $in: ids } })
            .populate()
            .exec((err, resp) => {
                res.status(200).send(resp);
            });
    }

};

module.exports = {createLead, getLeads, updateLeads, deleteLeads};
