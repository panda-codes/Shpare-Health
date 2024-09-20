const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt
require('dotenv').config();
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});

// Registration function
const registration = async (req, res) => {
  try {
    const userModel = mongoose.model('users');


    // Create the data object
    const data = {
      full_name: req.body.firstname,
      email: req.body.email,
      birthday: req.body.birthday,
      gender: req.body.gender,
      password: req.body.password
    };

    

    // Check if the user already exists in the database
    const existingUser = await userModel.findOne({ full_name: data.full_name });
    if (existingUser) {
      return res.status(400).send('User already exists. Please choose another name.');
    } else {
      // Hash the password using bcrypt
      const saltRounds = 10; // Number of salt rounds for bcrypt
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      // Replace the plain password with the hashed password
      data.password = hashedPassword;

      // Insert the new user into the database
      const userData = await userModel.insertMany(data);
      console.log(userData);

      // MAILGUN MESSAGE SETUP
  mg.messages.create('sandboxd57776eec0574e0f9ee743fde7500cdd.mailgun.org', {
    from: "dedeomate@gmail.com",
    to: [`${data.email}`],
    subject: `Welcome to Sphare Health ${data.full_name}`,
    text: ``,
    html: `<h1>Welcome to Sphare Health!</h1>
           <p>
            Dear ${data.full_name},

Welcome to Sphare Health! We're thrilled to have you join our community.<br><br>

At Sphare Health, we're committed to supporting your journey to better health. Whether you're booking appointments, accessing medical records, or managing your wellness goals, we're here to help every step of the way.<br><br>

If you have any questions or need assistance, feel free to reach out to our support team.<br><br>

Thank you for choosing Sphare Health. Here's to your health and well-being!<br><br>

Best regards,<br>
The Sphare Health Team
           </p>`
  })
  .then(msg => console.log(msg)) // logs response data
  .catch(err => console.error(err)); //logs any error

      // Send a success response
      return res.status(201).send('User registered successfully');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred during registration.');
  }
};

// Login function
const login = async (req, res) => {
  try {
    const userModel = mongoose.model('users');
    const user = await userModel.findOne({ email: req.body.email});

    if (user) {
      // Compare the provided password with the hashed password in the database
      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (validPassword) {
        return res.status(200).json({
          success:true
        })
      } else {
        return res.status(401).json({
          success:false
        })
      }
    } else {
      return res.status(404).json({
        success:false
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred during login.');
  }
};

// Export both registration and login functions
module.exports = { registration, login };
