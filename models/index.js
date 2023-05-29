const Posts = require('./posts');
const Users = require('./user');
const Comments = require('./comment');

Users.hasMany(Posts, {
  foreignKey: 'user_id'
});

Posts.belongsTo(Users, {
  foreignKey: 'user_id',
});

Comments.belongsTo(Users, {
  foreignKey: 'user_id',
});

Comments.belongsTo(postMessage, {
  foreignKey: 'post_id',
});

Users.hasMany(Comments, {
  foreignKey: 'user_id',
});

Posts.hasMany(Comments, {
  foreignKey: 'post_id'
});

module.exports = { Users, Posts, Comments };