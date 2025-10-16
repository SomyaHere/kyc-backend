const express = require('express');
const router = express.Router();
const { loginUser, getUser } = require('../controllers/authController');

router.post("/login", loginUser);
router.get("/get", getUser);

module.exports = router;
