const express = require('express');
const { body, validationResult } = require('express-validator');
 const bcrypt = require("bcrypt")
const router = express.Router();
const User = require("../Models/users");
const { genSalt } = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = "Hellomrjaybardhansinghhowareyou";
router.post("/createuser",[body('email').isEmail(),body('name').isLength({min: 5}),body('password','Incorrect Password').isLength({min:5})]
,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 const salt = await bcrypt.genSalt(10); 
 let secPass = await bcrypt.hash(req.body.password,salt);
try{
    await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass,
        location:req.body.location
    })
    res.json({success:true})
}catch(err){
    console.log(error);
    res.json({success:false});
}
})

router.post("/loginuser",[body('email').isEmail(),body('password','Incorrect Password').isLength({min:5})]
,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
try{
let userData = await User.findOne({email});
    if(!userData){
        return res.status(400).json({ errors:"Try logging with valid information"});
    }
    const passCompare = await bcrypt.compare(req.body.password,userData.password);
    if(!passCompare){
        return res.status(400).json({ errors:"Try logging with valid information"});
    }
    const data = {
        user:{
            id:userData.id
        }
    }
    const authToken = jwt.sign(data,jwtSecret);
    return res.json({success:true,authToken:authToken});
    res.json({success:true})
}catch(err){
    console.log(error);
    res.json({success:false});
}
})

module.exports = router;