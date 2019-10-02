const { AsyncRouter } = require("express-async-router");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const handleValidationErrors = require("../helpers/handleValidationErrors");

const router = AsyncRouter();

const signUpValidators = [
  check("email").isEmail(),
  check("password").exists(),
  check("passwordConfirm").exists()
];

const loginValidators = [
  check("email").isEmail(),
  check("password").exists()
];

router.post(
  "/sign-up", 
  [...signUpValidators, handleValidationErrors], 
  async (req, res) => {
    const userExists = await User.findOne({email: req.body.email});

    if(userExists)
      return res.status(400).send("E-mail already exists");
    if(req.body.password !== req.body.passwordConfirm)
      return res.status(400).send("Passwords do not match");

    const user = await User.signUp(req.body.email, req.body.password);
    res.status(201).send(user);
  }
);

router.post(
  "/login", 
  [...loginValidators, handleValidationErrors],
  async (req, res) => {
    
  }
);

module.exports = router;