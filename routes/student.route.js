const express = require('express')
const router=express.Router()

let student=[
    {name:"Dammy",age:745},
    {name:"Oyin",age:105},
    {name:"Damola",age:125},
]
router.get("/",(req,res)=>{
    res.send(student) 
})
router.get("/signup",(req,res)=>{
    res.send("I am student signup")
})

module.exports=router