const express = require("express");
const router = express.Router();

const income_svc = require("../services/income_service");

router.get("/fixed/:id", async (req, res) => {
  try {
    const data = await income_svc.read_by_user_id(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  try {
    await income_svc.insert_income(req.body);
    res.status(201).send({ msg: "income added succesfully!" });
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await income_svc.delete_income(req.params.id);
    res.status(200).send({ msg: "income deleted succesfully!" });
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});

module.exports = router;
