const express = require("express");
const router = express.Router();

const user_svc = require("../services/user_service");

router.put("/:userid", async (req, res) => {
  try {
    const data = await user_svc.update_user(req.body);
    res.status(200).send();
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});

router.get("/:username", async (req, res) => {
  try {
    const data = await user_svc.get_user_by_username(req.params.username);
    res.status(200).send(data);
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});

module.exports = router;
