const express = require("express");
const {
  newOrder,
  getSingleOrder,
  orders,
  updateOrder
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const roles = ["admin","procurement manager"];
const updateRole = ["admin","procurement manager", "inspection manager"]

router.route("/order/new").post(isAuthenticatedUser, authorizedRoles(...roles), newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, orders);
router.route("/order/:id").put(isAuthenticatedUser, authorizedRoles(...updateRole), updateOrder);

module.exports = router;