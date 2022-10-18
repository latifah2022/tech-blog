const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
  Post.findAll({
      attributes: [
          'id',
          'description',
          'title',
          'date',
        ],
     
      order: [[ 'date', 'DESC']],
      
      include: [
          {
              model: User,
              attributes: ['username']
          },
          {
              model: Comment,
              attributes: ['id', 'userComment', 'blog_id', 'user_id','date'],
              include: {
                  model: User,
                  attributes: ['username']
              }
          }
      ]
  })
  // return the posts
  .then(dbPostData => res.json(dbPostData))
  // if there was a server error, return the error
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    // Query configuration, as with the get all posts route
    attributes: [
      'id',
      'description',
      'title',
      'date',
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
          model: Comment,
          attributes: ['id', 'userComment', 'blog_id', 'user_id', 'date'],
          include: {
              model: User,
              attributes: ['username']
          }
      }
    ]
  })
    .then(dbPostData => {
      // if no post by that id exists, return an error
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      // if a server error occured, return an error
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
      const blogData = await Blog.create({...req.body, user_id: req.session.user_id});
  
        res.status(200).json(blogData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id', withAuth, (req, res) => {
  Post.update(req.body,
      {
          where: {
              id: req.params.id
          }
      }
  )
  .then(dbPostData => {
      if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
      }
      res.json(dbPostData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
  });
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        console.log('delete blog')
      const blogData = await Blog.destroy({
        where: {
            id: req.params.id
        }
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

