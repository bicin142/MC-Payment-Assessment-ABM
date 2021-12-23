const { Income, Expense, Type } = require("../models");

const authorizeUserIncome = async (req, res, next) => {
  const userId = +req.user.id;
  const id = +req.params.id;
  try {
    const foundIncome = await Income.findByPk(id);
    if (!foundIncome) throw { name: "NotFound", message: `Income id ${id} not found` };
    if (userId == foundIncome.userId) next();
    else throw { name: "Forbidden" };
  } catch (error) {
    next(error);
  }
};

const authorizeUserExpense = async (req, res, next) => {
  const userId = +req.user.id;
  const id = +req.params.id;
  try {
    const foundExpense = await Expense.findByPk(id);
    if (!foundExpense) throw { name: "NotFound", message: `Expense id ${id} not found` };
    if (userId == foundExpense.userId) next();
    else throw { name: "Forbidden" };
  } catch (error) {
    next(error);
  }
};

module.exports = { authorizeUserIncome, authorizeUserExpense }
