const { Router } = require('express');
const {initGet, initPost, initPut, initDelete} = require('../controllers/user.controller');
const router = Router();


router.get('/', initGet);
router.post('/', initPost);
router.put('/:id', initPut);
router.delete('/', initDelete);


module.exports = router;    