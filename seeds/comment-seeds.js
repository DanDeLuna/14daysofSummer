const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'Hello.',
    user_id: 6,
    post_id: 1
  },
  {
    comment_text: 'He needs some milk.',
    user_id: 6,
    post_id: 8
  },
  {
    comment_text: 'Peache peaches .',
    user_id: 3,
    post_id: 10
  },
  {
    comment_text: 'Hasbulla.',
    user_id: 3,
    post_id: 18
  },
  {
    comment_text: 'Cool beans.',
    user_id: 7,
    post_id: 5
  },
  {
    comment_text: 'Nice.',
    user_id: 1,
    post_id: 20
  },
  {

];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;