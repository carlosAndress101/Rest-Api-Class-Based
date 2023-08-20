const { Router } = require("express");
const {
  initGet,
  createUser,
  initPut,
  initDelete,
} = require("../controllers/user.controller");
const { createUserSchema } = require("../schemas/userSchema");
const { validateFields } = require("../middleware/validate-fields");

const router = Router();

router.get("/", initGet);

router.post("/", (req, res, next) => {
  validateFields(createUserSchema, req, res, next);
}, createUser);


router.put("/:id", initPut);
router.delete("/", initDelete);

module.exports = router;
