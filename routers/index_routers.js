const express = require("express");
const router = express.Router();
const register = require("../controllers/register");
const login = require("../controllers/login");

router.get("/", (req, res) => {
  res.end("/");
});

router.get("/entries", entries.list);
router.post("/entry", entry.post);

router.get("/register", register.form);
router.post("/register", register.submit);

router.get("/login", login.form);
router.post("/login", login.submit);

router.get("/post", post.form);
router.post("/post", post.submit);

router.get("/logout", logout);

module.exports = router;
