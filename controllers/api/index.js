const router = require('express').Router();
const userRoutes = require('./userRoute');
const commentRoutes = require('./commentRoute');
const blogRoutes = require('./blogRoute');

router.use('/user', userRoutes);
router.use('/comment', commentRoutes);
router.use('/blog', blogRoutes);

module.exports = router;
