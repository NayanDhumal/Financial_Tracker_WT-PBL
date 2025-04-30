const express = require('express');
const router = express.Router();
const {createDebt, getUserDebts, updateDebt, deleteDebt} = require('../controllers/debtController');

const { protect } = require('../middlewares/authMiddleware');


router.route('/').get(protect, getUserDebts).post(protect, createDebt);
router.route('/:id').put(protect, updateDebt).delete(protect, deleteDebt);

module.exports = router;