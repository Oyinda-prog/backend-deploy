const express = require('express')
const app = express()
// const router=express.Router()   
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
require('./connection/mongoose.connection')
app.use(bodyParser.urlencoded({extended: true}))
let port = process.env.PORT
app.set("view engine", "ejs")

const studentRouter=require('./routes/student.route')
 const staffRouter=require('./routes/staff.router')
  app.use("/staff",staffRouter)
app.use("/students", studentRouter)
// mongoose.connect(URI) 
// .then(()=>{
//     console.log("Mongoose is bae");
// })
// .catch((err)=>{
//     console.log(err);
// })





let userModel=require('./models/user.model')
let todoModel = require('./models/todo.model')



// let userSchema  = {
//     firstname :{type: String, required: true},
//     lastname :{type: String, required: true},
//     email :{type: String, required: true, unique: true},
//     password :{type: String, required: true},
// }

// let userModel = mongoose.model("all_users", userSchema)

app.get("/",(req,res)=>{
    res.render("signup")
})

app.get("/signin",(req,res)=>{
    res.render("signin")
})

app.get("/details",(req,res)=>{
    userModel.find()
    .then((result)=>{
        console.log(result);
        res.render("dashboard", {status: true, userDetails:result})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post("/signup", (req,res)=>{
    let info = req.body
    // console.log(info);
    let form = new userModel(info)
    // console.log(form);
    form.save()
    .then((result)=>{
        if(result) {
            res.redirect("/signin")
        } else {
            res.render("signup")
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post("/signin",(req,res)=>{
    userModel.findOne({
        email: req.body.email,
        password: req.body.password
    })
    .then((result)=>{
        console.log(result);
        if (result) {
            res.redirect("/details")
        } else {
            res.render("signin")
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post("/delete",(req,res)=>{
    userModel.deleteOne({email:req.body.newEmail})
    .then((result)=>{
        res.redirect("/details")
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post("/edit",(req,res)=>{
    userModel.findOne({email:req.body.newEmail})
    .then((result)=>{
        if(result) {
            res.render("editusers", {info: result})
            console.log(result);
        }
        else{
            console.log("unable to edit");
        }
      })
    .catch((err)=>{
        console.log(err);
    })
})


  
app.post("/update",(req,res)=>{
    let email= req.body.email
    userModel.updateOne({email},req.body)
    .then((result)=>{
        console.log(result);
        res.redirect("/details")
    })
    .catch((err)=>{
        console.log(err);
    })
})



app.get("/det",(req,res)=>{
   res.render("signin")
})

app.get("/signup2",(req,res)=>{
    res.render("signup2")
})
app.post("/signup2",(req,res)=>{
    let info1=req.body 
    console.log(info1);
    let form= new todoModel(info1)
    form.save()
    .then((result)=>{
        console.log(result);
        if (result) {
           res.redirect ("/det")
        }
        else{
            res.render("signup2")
        }

    })
    .catch((err)=>{
        console.log(err);
    })
})
app.listen(port, ()=>{
    console.log(`I am running on port ${port}`);
})