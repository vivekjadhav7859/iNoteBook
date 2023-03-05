const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'vivekisverygoodboy$';

//Route 1 : create a user using :POST"/api/auth/createuser". Doesn't requite aunthetication

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        res.json({ authtoken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 2 : aunthenicate a user------>>>>> Login

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be wrong').exists()
], async (req, res) => {
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false
            return res.status(400).json({ success,error: "please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success=true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success,authtoken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3 : get logged in user details
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;