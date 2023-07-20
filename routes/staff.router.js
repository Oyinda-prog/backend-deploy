const express=require('express')
const router= express.Router()

  router.get("/",(req,res)=>{
    res.send("I am the staff homepage")
  })
router.get("/signup",(req,res)=>{
    res.send("I am staff signup")
})

module.exports=router