//נגדיר ראוטר עם כל הניתובים שלו ונייצא אותו
const router = require('express').Router();
const categoryController = require('../controllers/category-hbs');
router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.addNewCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;