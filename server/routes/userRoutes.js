const express = require('express');
const {authUser} = require('../controllers/authUser');

const router = express.Router();

router.route('/authuser').post(authUser);

module.exports = router;