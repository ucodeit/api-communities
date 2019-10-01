const express = require('express');
const router = express.Router();
const controller = require('../controllers/alumnos');;

router.post("/registrar", controller.Registrar);
router.post("/login", controller.Login);


module.exports = router;