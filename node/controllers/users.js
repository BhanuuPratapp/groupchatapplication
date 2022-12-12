
const bcrypt = require('bcrypt');
const Signup = require('../models/user')
const jwt = require('jsonwebtoken')
//const ledb = require('../models/leaderboard')


 exports.postSignUp =  async (req, res, next) =>{
  try{
   const name  = req.body.username;
   const email = req.body.email;
   const phone = req.body.phone
   const password = req.body.password;
   console.log(name)
   console.log(email)

   if(!req.body.username || !req.body.email || !req.body.password ){
     throw new Error("This field is  mandatory");
   }
   //const usernames = await Signup.findAll({where: {username:username}});
   const useremail = await Signup.findAll({where: {email:email}});
   
   //let length2 = usernames.length;
   let length1 = useremail.length;
   if(length1 > 0 )
   {
      
        res.status(201).json({message:"User already exist"})

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
      
    res.status(201).json({newUserDetail: data, message:"Successfully created the user"});
       })
      }
    }
  catch(err){
   res.status(500).json({
    success:false, message: "Failed in creating the user"
   })
  }
 }


 
function generateAccessToken(id){
  return jwt.sign({userid: id},'y5ZLp3zJqHIuRdw')
}

  exports.postLogin = async(req, res, next) =>{
      try{
          
          const email = req.body.email;
          const password = req.body.password;

        const emaildata=  await  Signup.findAll({where: {email: email}});
     

       const emaillength = emaildata.length;

   

       if(emaillength === 1 )
       {
        bcrypt.compare(password, emaildata[0].password, async function(err, result) {
       
        if(err){
          throw new Error();
        }
        else if(result == true){
          
              res.status(201).json({success: true, message:"Successfully logged In", token: generateAccessToken(emaildata[0].id)})
          
        }
        else if(result == false)
        {
          res.status(401).json({success: true, message:"Wrong password"})
        }
        
          });  

       }
       else
       {
          throw new Error();
       }

        }
        catch(err)
        {
          res.status(404).json({success:false, message: "User does not exist"})
        }   
  }
