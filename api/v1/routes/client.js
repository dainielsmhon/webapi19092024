//נגדיר ראוטר עם כל הניתובים שלו ונייצא אותו
const router = require('express').Router();
const { model } = require('mongoose');
const clientControllet = require('../controllers/client');
router.get('/', clientControllet.getAllClient);
router.get('/:id', clientControllet.getAllClientById);
router.post('/', clientControllet.addNewClient);
router.put('/:id', clientControllet.updateClientById);
router.delete('/:id', clientControllet.deleteClient);

module.exports = router;