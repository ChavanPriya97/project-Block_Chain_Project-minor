const express = require('express');
const router = express.Router();
const coinController = require('../controllers/coinController');

/*******************************Assets Api*******************************/
router.get("/assets",coinController.getAssets)

/******************************no path found********************************/
router.all("/*",function (req,res){
    return res.status(404).send({status:false,message:"path not found"})
})

module.exports = router;