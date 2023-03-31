const express=require("express");
const router =express.Router();
const userController =require("../controller/user")
const auth =require("../midleware/jwt")
router.get("/data",auth,userController.getData)
router.get("/data/:id",auth,userController.getIdData)
router.post("/data",userController.postData)
router.post("/login",userController.login)
router.put("/data/:id",userController.putData)
router.delete("/data/:id",userController.delData)
module.exports= router