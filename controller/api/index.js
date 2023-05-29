const router = require('express').Router();

const userRoutes = require('./userinfo-route');
const postRoutes = require('./post-route');
const commentRoutes = require('./comment-Route.js');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;