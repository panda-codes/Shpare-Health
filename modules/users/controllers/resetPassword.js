const mongoose = require('mongoose');
const bcrypt = require('bcrypt')//this is used to encrypt password
require('dotenv').config();
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});



const restPassword = async(req,res) =>{

    const userModel = mongoose.model('users');

    const {email,newpassword,resetcode} = req.body;

    // custom validation
    if(!email) throw "Email is required";
    if(!resetcode) throw "reset code is required";
    if(!newpassword) throw "new password code is required";
    if(newpassword<5) throw "new password must atleast be 5 characters";

    

    const getUser = await userModel.findOne({
        email:email,
        resetcode:resetcode
    })

    if(!getUser) throw "Invalid reset code";

    const hashedPassword = await bcrypt.hash(newpassword,12);//password from the payload being encrypted


    await userModel.updateOne({
        email:email
    },
    {
        password:hashedPassword,
        resetcode:""//you needs to be an empty so user does not reset the password over and over again
    },
    {
        runValidators:true
    })

    mg.messages.create('sandboxd57776eec0574e0f9ee743fde7500cdd.mailgun.org', {
        from: "dedeomate@gmail.com",
        to: [`${email}`],
        subject: `Password Reset - Sphare Health`,
        text: ``,
        html: `<h1>Password Reset - Sphare Health!!!</h1>
               <p>
                Dear ${getUser.full_name},
    
    your password has been changed<br><br>
        
    Best regards,<br>
    The Sphare Health Team
               </p>`
      })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); //logs any error

    

    res.status(201).json({
        status:"success",
        message:"password reset successful"
    })
}

module.exports = restPassword;