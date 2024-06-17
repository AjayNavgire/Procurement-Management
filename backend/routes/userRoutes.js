const express = require("express");
const { 
    registerUser,
    loginWithEmail,
    loginWithMobile,
    getSingleUser,
    updateUser,
    getAllUser
} = require("../controllers/userController");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth")
const roles = ["admin","procurement manager"]

const router = express.Router();

router.route("/register").post(isAuthenticatedUser, authorizedRoles(...roles),registerUser);
// router.route("/register").post(registerUser);

router.route("/login-with-email").post(loginWithEmail);

router.route("/login-with-mobile").post(loginWithMobile);

router.route("/users").get(isAuthenticatedUser, getAllUser);

router
.route("/user/:id")
.get(isAuthenticatedUser, authorizedRoles(...roles), getSingleUser)
.put(isAuthenticatedUser, authorizedRoles(...roles), updateUser)

module.exports = router;