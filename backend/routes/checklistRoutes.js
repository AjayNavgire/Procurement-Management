const express = require("express");
const {
    newChecklist,
    updateChecklist,
    getSingleChecklist
} = require("../controllers/checklistController");
const router = express.Router();

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const roles = ["admin","procurement manager"];
const readRoles = [...roles, "inspection manager"]

router.route("/checklist/new").post(isAuthenticatedUser, authorizedRoles(...roles), newChecklist);
router.route("/checklist/:id").put(isAuthenticatedUser, authorizedRoles(...roles), updateChecklist);
router.route("/checklist/:id").get(isAuthenticatedUser, authorizedRoles(...readRoles), getSingleChecklist);


module.exports = router