//נגדיר ראוטר עם כל הניתובים שלו ונייצא אותו
const router = require('express').Router();
const { model } = require('mongoose');
const clientController = require('../controllers/client-hbs');
router.get('/', clientController.getAllClient);
router.get('/:id', clientController.getClientById);
router.post('/', clientController.addNewClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;