const { Router } = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { createUserSchema, updateUserSchema, deleteUserSchama } = require("../schemas/userSchema");
const { validateFields } = require("../middleware/validate-fields");

const router = Router();

router.get("/", getAllUsers);

router.post("/", (req, res, next) => {
  validateFields(createUserSchema, req, res, next);
}, createUser);


router.put("/:id", (req, res, next) => {
  validateFields(updateUserSchema, req, res, next)
}, updateUser);

router.delete("/:id", (req, res, next) => {
  validateFields(deleteUserSchama, req, res, next)
}, deleteUser);

module.exports = router;
