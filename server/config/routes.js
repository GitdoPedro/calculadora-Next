const express = require('express');
const calcController = require('../controllers/calcController');

const router = express.Router();

router.post('/', calcController.create);
router.get('/:id',calcController.findById)
router.get('/', calcController.listAll);
router.put('/:id', calcController.update);
router.delete('/:id', calcController.delete);

module.exports = router;