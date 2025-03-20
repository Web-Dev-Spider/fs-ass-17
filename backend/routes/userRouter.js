const express = require("express");
const {
  getUsers,
  getUserById,
  updateUserById,
  changeUserDetailsById,
  deleteUserById,
  showDashboard,
} = require("../controllers/userController");

const authorize = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.get("/all-users", getUsers);
userRouter.get("/dashboard", authorize, showDashboard);
userRouter.get("/:userId", authorize, getUserById);
userRouter.patch("/:userId", authorize, updateUserById);
userRouter.put("/:userId", authorize, changeUserDetailsById);
userRouter.delete("/:userId", authorize, deleteUserById);

module.exports = userRouter;
