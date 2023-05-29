const Publicacion = require('./posts');
const Usuario = require('./user');
const Comentario = require('./comment');

Usuario.hasMany(Publicacion, {
  foreignKey: 'user_id'
});

Publicacion.belongsTo(Usuario, {
  foreignKey: 'user_id',
});

Comentario.belongsTo(Usuario, {
  foreignKey: 'user_id',
});

Comentario.belongsTo(postMessage, {
  foreignKey: 'post_id',
});

Usuario.hasMany(Comentario, {
  foreignKey: 'user_id',
});

Publicacion.hasMany(Comentario, {
  foreignKey: 'post_id'
});

module.exports = { Usuario, Publicacion, Comentario };