const express = require('express');
const router = express.Router();

router.post("/foodData",(req,res)=>{
    try {
        res.send([global.dataItem,global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.send("Showing serever Error!");
    }
})
module.exports = router;