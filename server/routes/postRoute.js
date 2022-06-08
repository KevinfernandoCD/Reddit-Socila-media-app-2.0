const express = require('express');
const {getCommunityPost,createPost,getPublicPosts,DeletePost,voteup,votedown,createComment,likeComment} = require('../controllers/postController');
const {authUserTokenId} = require('../config/auth');

const router = express.Router();

router.route('/newpost').post(authUserTokenId,createPost);
router.route('/publicPosts').get(getPublicPosts);
router.route('/deletepost/:id').put(DeletePost);
router.route('/voteup/:id').post(voteup);
router.route('/votedown/:id').post(votedown);
router.route('/createcomment/:id').post(createComment);
router.route('/likecomment/:id').post(likeComment);
router.route('/communityposts/:id').post(getCommunityPost)

module.exports = router;