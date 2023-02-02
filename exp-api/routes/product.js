const router = require('express').Router();
const controller = require('../controllers/ProductCtrl');

router.post('/', controller.createEntity);

router.get('/:id', controller.getById);

router.put('/:id', controller.updateEntity);

router.delete('/:id', controller.deleteById);

module.exports = router;