const express = require("express");
const router = express.Router();

const expense_service = require("../services/expense_service");

router.post("/", async (req, res) => {
  //use service for saving router
  try {
    await expense_service.save_new_expense(req.body);
    res.status(201).send();
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});

router.get("/:userid", async (req, res) => {
  try {
    const data = await expense_service.get_expenses_by_user(req.params.userid);
    res.status(200).send(data);
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});

router.get("/fixed/:userid", async (req, res) => {
  try {
    const data = await expense_service.get_fixed_expenses_by_user(
      req.params.userid
    );
    res.status(200).send(data);
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await expense_service.delete_expense(req.params.id);
    res
      .status(200)
      .send({ message: `expense ${req.params.id} deleted successfully` });
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  try {
    await expense_service.update_expense(req.body);
    res
      .status(200)
      .send({ message: `expense ${req.params.id} updated successfully` });
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});

module.exports = router;
