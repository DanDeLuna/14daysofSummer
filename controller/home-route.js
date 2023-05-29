const router = require("express").Router();
const { Publicacion, Comentario, Usuario } = require("../models");

// gets all posts to be on  homepage
router.get("/", (req, res) => {
    Publicacion.findAll({
    include: [Usuario],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("all-posts", { posts });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// gets only one  post
router.get("/post/:id", (req, res) => {
    Publicacion.findByPk(req.params.id, {
    include: [
        Usuario,
      {
        model: Comentario,
        include: [Usuario],
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("single-post", { post });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("You need to signup");
});

module.exports = router;