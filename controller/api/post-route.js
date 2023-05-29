const router = require("express").Router();
const { Publicacion } = require("../../models/");
const wAuth = require("../../utils/auth");

router.post("/", wAuth, (req, res) => {
  const body = req.body;
  console.log(req.session.userId);
  Publicacion.create({ ...body, userId: req.session.userId })
    .then(newPost => {
      res.json(newPost);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", wAuth, (req, res) => {
  console.log(req.body, req.params.id)
  Publicacion.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(affectedRows => {
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", wAuth, (req, res) => {
  console.log(req.body, req.params.id)
  Publicacion.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(affectedRows => {
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;