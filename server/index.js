const express = require('express');
const boddParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

//import localdb
const db = require('./db');



const app = express();
app.use(boddParser.json());
app.use(boddParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'godin', resave: false, saveUninitialized: false })); 

app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
}));

app.use(cookieParser('godin')); 

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport); 



app.post('/register',(req, res)=> {
    
    const username = req.body.username;
    const password = req.body.password;

    const query_ins = "INSERT INTO account(`username`, `password`) VALUES (?,?)";
    const query_get = "SELECT * FROM account WHERE username = ?";

    db.query(query_get, [username], (err, result)=> {
        if(err){throw err;}
        if(result.length > 0){
            res.send({message: "Username already exists"});
        }
        if(result.length === 0){
            const hashedPassword = bcrypt.hashSync(password, 10);
            db.query(query_ins, [username,hashedPassword], (err, result)=>{
                if(err){throw err;}
                res.send({message: "User Created!"});
            });
        }
    });
});

app.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err,user,info)=>{
        if(err) {throw err;}
        if(!user){res.send('No User Exist!')}
        if(user){
            req.logIn(user, (err)=>{
                if(err){throw err;}
                res.send("User Logged In");
                console.log(user);
            })
        }
    })(req,res,next);
});

app.get('/getUser', (req,res)=>{
    res.send(req.user);
})
app.get('/session', (req,res, next)=>{
    res.send(req.session);
})

//CRUD OPERATIONS


app.get("/api/get", (req,res) => {
    const query = "SELECT * FROM cars";
    db.query(query,(err,result)=>{
        res.send(result);
    })
})


app.post("/api/post", (req,res) => {
    const brand = req.body.brand;
    const model = req.body.model;
    const query = "INSERT INTO cars (brand,model) VALUES (?,?)";
    db.query(query,[brand,model],(err,result)=>{
        if(err){throw err;}
        res.send(result);
    })
})


app.listen(3001, () => {
    console.log('Server started on port 3001');
});