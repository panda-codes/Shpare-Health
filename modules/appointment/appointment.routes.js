const express = require('express');
const createAppointment= require('./controllers/createAppointment');

const appointmentRoute=express.Router();

//Routes
appointmentRoute.post('/',createAppointment);//to create appoinment

module.exports = appointmentRoute;