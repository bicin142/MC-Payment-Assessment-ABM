const router = require("express").Router();
const { userCreate, userLogin,getToken, googleSignIn } = require("../controllers/users");
const authenticateUser = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const balanceRoute = require('./balance')
const incomeRoute = require('./income')
const expenseRoute = require('./income')

router.get("/", (req, res) => {res.send("Welcome to My Budget App!")});
router.post("/register", userCreate);
router.post("/login", userLogin);
router.post("/googleSignIn", googleSignIn);
router.get("/checkToken", getToken);

router.use("/balance", authenticateUser, balanceRoute);
router.use('/income', authenticateUser, incomeRoute)
router.use('/expense', authenticateUser,  expenseRoute)

router.use(errorHandler);

module.exports = router;