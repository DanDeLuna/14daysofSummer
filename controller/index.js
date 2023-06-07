const router = require('express').Router();

const dashboardRutas = require('./dash-route');
const casaRutas = require('./home-routes');
const apiRutas = require("./api/index")

router.use('/', casaRutas);
router.use('/dashboard', dashboardRutas);
router.use('/api', apiRutas);
router.use((req, res) => {
    res.status(404).end();
  });
  
module.exports = router;