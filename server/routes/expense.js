const router = require("express").Router();
const { readExpense, postExpense, editExpense, deleteExpense } = require("../controllers/expense");
const { authorizeUserExpense } = require("../middlewares/authorization");

router.get("/", readExpense);
router.post("/", postExpense);
router.put("/:id", authorizeUserExpense, editExpense);
router.delete("/:id", authorizeUserExpense, deleteExpense);

module.exports = router;