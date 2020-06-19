var { budgets, transactions, users } = require("./controllers");
var router = require("express").Router();

router.get("/budgets", budgets.get);
router.post("/budgets", budgets.post);
router.put("/budgets", budgets.put);
router.delete("/budgets", budgets.delete);

router.get("/transactions", transactions.get);
router.post("/transactions", transactions.post);
router.delete("/transactions", transactions.delete);

router.get("/users", users.get);
router.post("/users", users.post);

module.exports = router;