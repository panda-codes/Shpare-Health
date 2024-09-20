const mongoose=require('mongoose');
require('dotenv').config();
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});

const createAppointment = async(req,res)=>{
    try{
    const userModel=mongoose.model("users");
    const appointmentModel = mongoose.model("appointment");

    const {full_name,email,appointmentDate,appointmentTime,phoneNumber,notes}=req.body

    // CUSTOM VALIDATION
    if(!full_name)throw"fullname is required";
    if(!email)throw"full is required";
    if(!appointmentDate)throw"appointment date is required";
    if(!appointmentTime)throw"appointment time is required";
    if(!phoneNumber)throw"phone number is required";

    const user= await userModel.findOne({
        email:email
    });


    if(!user) throw"user does not exist"

    const newAppointment= await appointmentModel.create({
        user_id:user._id,
        full_name,
        email,
        appointmentDate,
        appointmentTime,
        phoneNumber,
        notes
    })


    mg.messages.create('sandboxd57776eec0574e0f9ee743fde7500cdd.mailgun.org', {
        from: "dedeomate@gmail.com",
        to: [`${email}`],
        subject: `Sphare Health Appointment`,
        text: ``,
        html: `<h1>Sphare Health Appointment Details!!!</h1>
               <p>
                Dear ${full_name},
    
    This is a friendly reminder about your upcoming appointment with Dr. [Doctor's Last Name].<br><br>

    <h3>Appointment Details:</h3>
    <ul>
        <li>Date: ${appointmentDate}</li>
        <li>Time: ${appointmentTime}</li>
    </ul>
    
   Please make sure to arrive a few minutes early. If you need to reschedule,kindly contact us at your earliest convenience.<br><br>
    
    We look forward to seeing you!<br><br>
        
    Best regards,<br>
    The Sphare Health Team
               </p>`
      })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); //logs any error

        // Send a success response
        return res.status(201).send('Appointment scheduled successfully');
    }catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while scheduling appointment.');
      }
}

module.exports=createAppointment;
