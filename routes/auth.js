const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register',async(req,res)=>{
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)
    const obj = {
        username,
        email,
        password:hashPassword
    }
    try{
        const user = await User.create(obj);
        res.status(201).json({ message: 'User registered successfully' });
    }catch(e){
        res.status(500).json({ message: 'User registration failed', e });
    }
})

router.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    try {
        const user = await User.findOne({username});
        const hashPassword = await bcrypt.compare(password,user.password)
        if(hashPassword){
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
            // res.status(201).json({ message: 'User login successfully' });
        }else{
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'User login failed', error });
    }
})

module.exports = router