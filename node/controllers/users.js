
const bcrypt = require('bcrypt');
const Signup = require('../models/user')
const jwt = require('jsonwebtoken')
//const ledb = require('../models/leaderboard')


 exports.postSignUp =  async (req, res, next) =>{
  try{
   const name  = req.body.name;
   const email = req.body.email;
   const phone = req.body.phone
   const password = req.body.password;
   console.log(name)
   console.log(email)

   if(!req.body.name || !req.body.email || !req.body.password){
     throw new Error("This field is  mandatory");
   }
   //const usernames = await Signup.findAll({where: {username:username}});
   const useremail = await Signup.findAll({where: {email:email}});
   
   //let length2 = usernames.length;
   let length1 = useremail.length;
   if(length1 > 0 )
   {
      
        res.status(200).json({message:"User already exist"})

   }
   else
   {
   
    bcrypt.hash(password, 1 , async function(err, hash) {
    
      
        const data = await Signup.create( {name:name,email:email,phone:phone,password:hash} ).then((result)=>{
          /*
          ledb.create({
             forsignupId: result.id,
             username:result.username,
            
         })
        */
        
        
    });    
      
    res.status(201).json({newUserDetail: data});
       })
      }
    }
  catch(err){
   res.status(500).json({
    success:false, message: "Failed in creating the user"
   })
  }
 }