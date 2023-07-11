const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  try {
      const userData = await User.findAll({
          include: [{ model: Post }, {model: Comment}]
      });
      res.status(200).json(userData);
  } catch (error) {
      console.log(error);
  }
});


router.post('/', async (req, res) => {
  try {
      const userData = await User.create({
          user_name: req.body.user_name,
          password: req.body.password
      });

      req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          res.status(200).json(userData);
      });

  } catch (err) {
      res.status(400).json(err);
  }
});


router.post('/login', async (req, res) => {
  try {
      
      const userData = await User.findOne({ where: { user_name: req.body.user_name } });
      
      if (!userData) {
          res.status(400).json({ message: 'Incorrect email or password, please try again' }); 
          return;
      }
     
      const validPassword = await bcrypt.compare(
          req.body.password,
          userData.password
      );
      if (!validPassword) {
          res.status(400).json({ message: 'Incorrect email or password, please try again' });
          return;
      } else {
          req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          res.status(200).json({ user: userData.user_name, message: 'You are now logged in!' });
          })
      }
  } catch (err) {
      res.status(500).json(err);
  }
});


router.post('/logout', async (req, res) => {
  if (req.session.logged_in) {
      await req.session.destroy(() => {
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});
module.exports = router;