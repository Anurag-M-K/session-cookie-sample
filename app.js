const cookieParser = require('cookie-parser')
const sessions = require('express-session')

const express = require('express');
const path = require("path");
const layout = require("express-ejs-layouts");
const app = express()
const port = 4500;


app.use(layout)
//view engine set 
app.set("views","./view"); 
app.set("layout","layout/layout")
app.set("view engine","ejs");

app.use(sessions({
    secret: "~!@#$%^&*()jhhjghdg366589879885",
    saveUninitialized: true,
    cookie : {maxAge:50000},
    resave: false
  
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use("/css", express.static(path.join(__dirname + "puublic/css")));
app.use("/img", express.static(path.join(__dirname + "puublic/img")));
app.use("/js", express.static(path.join(__dirname + "puublic/js")));
app.use(express.urlencoded({extended:true}));

//session deletion after logout
app.use(function (req, res, next) {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});


// app.get("/logout",(req,res) => {
//     res.render("page/logout");
// })



//usrnaeme and password

app.get("",(req,res) => {
    //session request session
    if(req.session.user){
        res.render("pages/logout")
    }else{
        res.render("pages/index")
    }
    
  
});

const credential = {
    username : "anuragmk",
    password : "2424"
}
//create  route  req.body.username=form username, credential.username=object, req.body.password=form, credential.password=object
app.post("/login",(req,res) =>{
    if(req.body.username === credential.username && req.body.password === credential.password){
        req.session.user = req.body.username; //form username
                                                        
        res.render("pages/logout")
    }else{
        res.render("pages/index",{errorMessage:"usrname or password error"} )
    }
})
//route seting for logout
app.get("/logout",(req,res) =>{
    req.session.destroy(function(err){
        if(err){
            console.log(err)
            res.send("error");
        }else{
            res.render("pages/index")
            
            
        }
    })
})

//for terminal print
app.listen(port,() => console.info('server started'));