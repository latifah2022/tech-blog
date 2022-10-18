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
  
      res.render('blog', {
        ...blog,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/comment/:id", withAuth, async (req, res) => {
  try {
    const commentData = await this.post.findByPk(req.params.id, {
      include: [
        {
        model: User,
        attributes: ["username"],
        },
        {
          model: Comment, 
          attributes: ["comment", "date", "user_id", "blog_id"],
          include: [{model: User, attributes: ["username"]}],
        }
      ]
    })
    const comment = commentData.get({plain: true});
    if (comment) {
      res.render("comment", {
        ...comment,
        logged_in: req.session.logged_in
      });
    } else {
      res.status(400).json(" Blog not found");
    }
  }  catch (err) {
    res.status(500).json(err);
  }
})

router.get('/profile', withAuth, async (req, res) => {
    try {
      
    const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blog }],
    });
  
    const user = userData.get({ plain: true });
  
      res.render('blog', {
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

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});


  
module.exports = router;  