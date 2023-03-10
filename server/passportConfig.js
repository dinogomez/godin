const db = require('./db');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    passport.use(
        new localStrategy((username, password, done) =>{
            const query = "SELECT * FROM account WHERE username = ?";
            db.query(query, [username], (err, result)=>{
                if(err) {throw err;}
                if(result.length === 0){
                    return done(null, false)
                }
                bcrypt.compare(password, result[0].password, (err,res)=>{
                    if(err){throw err;}
                    if(res === true){
                        return done(null, result[0])
                    }
                    else{
                        return done(null, false);
                    }
                })
            }) 
        })
    )

    passport.serializeUser((user,done)=>{
        done(null, user.id);
    })

    passport.deserializeUser((id,done)=>{
        const query_getId = "SELECT * FROM godin.account WHERE id = ?";
        db.query(query_getId, [id], (err, result)=>{
            if(err) {throw err;}
            const userInfo = {
                id: result[0].id,
                username: result[0].username
            }
            done(null, userInfo);
        })


    })
}