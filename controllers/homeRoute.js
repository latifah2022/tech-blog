const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        include: [
          {model: User, attributes: {exclude: ['password', 'email']}},
          {model: Comment, include: [{model: User}]},
        ],
    });
  
    const blogs = blogData.map((book) => book.get({ plain: true }));
  
    res.render('homepage', {
        blogs,
        logged_in: req.session.logged_in
    });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [
          {model: User, attributes: {exclude: ['password', 'email']}},
          {model: Comment, include: [{model: User}]},
        ]
      });
  
      const blog = blogData.get({ plain: true });
  
      res.render('book', {
        ...blog,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
      
    const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Book }],
    });
  
    const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });
  
module.exports = router;  