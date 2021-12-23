const router = require("express").Router();
const { readIncome, postIncome, editIncome, deleteIncome } = require("../controllers/income");
const { authorizeUserIncome } = require("../middlewares/authorization");

router.get("/", readIncome);
router.post("/", postIncome);
router.put("/:id", authorizeUserIncome, editIncome);
router.delete("/:id", authorizeUserIncome, deleteIncome);

module.exports = router;