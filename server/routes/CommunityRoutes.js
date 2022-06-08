
const express = require('express');
const {createCommunity,getCommunities,getCommunity,addToCommunity,removeFromCommunity} = require('../controllers/CommunityController')

const router = express.Router();

router.route('/newcommunity').post(createCommunity);
router.route('/allcommunities').get(getCommunities);
router.route('/:id').get(getCommunity);
router.route('/addtocommunity/:id').post(addToCommunity);
router.route('/removefromcommunity/:id').post(removeFromCommunity);

module.exports = router;