const ClientModel = require('../models/client');
module.exports = {
    getAllClient: (req, res) => {
        ClientModel.find().then((clie) => {
            console.log(clie);
            return res.status(200).json(clie);
        });

    },
    getAllClientById: (req, res) => {
        ClientModel.find({ cid: req.params.id }).then((clie) => {
            return res.status(200).json(clie);
        });
    },

    addNewClient: (req, res) => {
        ClientModel.insertMany([req.body]).then((clie) => {

            return res.status(200).json(clie);
        });

    },
    updateClientById: (req, res) => {

        ClientModel.updateMany({ cid: req.params.id }, req.body).then((clie) => {

            return res.status(200).json(clie);
        });
    },
    deleteClient: (req, res) => {
        ClientModel.deleteOne({ cid: req.params.id }, req.body).then((clie) => {

            return res.status(200).json(clie);
        });
    }




};