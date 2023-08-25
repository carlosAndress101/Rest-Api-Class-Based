const { Router } = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  initDelete,
} = require("../controllers/user.controller");
const { createUserSchema, updateUserSchema } = require("../schemas/userSchema");
const { validateFields, existUserById } = require("../middleware/validate-fields");

const router = Router();

router.get("/", getAllUsers);

router.post("/", (req, res, next) => {
  validateFields(createUserSchema, req, res, next);
}, createUser);


router.put("/:id", (req, res, next) => {
  validateFields(updateUserSchema, req, res, next)
}, updateUser);

router.delete("/", initDelete);

module.exports = router;
