import express from "express";
import { body } from "express-validator";
import {
  curruntUser,
  createUser,
  createSession,
} from "../../controllers/userController";
import { requestValidation } from "../../middleware/requestValidation";
const router = express.Router();

router.post(
  "/signup1",
  [
    body("email").isEmail().withMessage("Email must Be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 to 20 characters"),
  ],
  requestValidation,
  createUser
);

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email must Be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 to 20 characters"),
  ],
  requestValidation,
  createSession
);
router.get("/curruntUser", curruntUser);

export default router;
