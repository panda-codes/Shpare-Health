const mongoose = require('mongoose')
require('dotenv').config();
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});

const forgotPassword=async(req,res)=>{

    const userModel= mongoose.model("users");
    const{email}=req.body;
    if(!email)throw"email required";

    const getUser = await userModel.findOne({
        email:email
    })

    if(!getUser)throw "user does not exist"

    const resetcode = Math.floor(10000+Math.random()* 90000);//code to create 5 random numbers

    await userModel.updateOne({
        email:email//to find the user you want to update
    },
    {
        resetcode:resetcode//the field you are updating
    },
    {
        runValidators:true//so the validations from your model can still work
    })

        await mg.messages.create('sandboxd57776eec0574e0f9ee743fde7500cdd.mailgun.org', {
        from: "dedeomate@gmail.com",
        to: [`${email}`],
        subject: `Reset code -Sphare Health`,
        text: ``,
        html: `<h1>Reset code -Sphare Health!!!</h1>
               <p>
                Dear ${getUser.full_name},
    
    your password reset code is  ${resetcode}<br><br>
        
    Best regards,<br>
    The Sphare Health Team
               </p>`
      })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); //logs any error


      res.status(200).json({
        status:'reset code sent to Email successfully',
    })

}

module.exports=forgotPassword;