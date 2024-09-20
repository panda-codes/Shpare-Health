const mongoose = require('mongoose');


// Define the Appointment schema
const appointmentSchema = new mongoose.Schema({
    // patient: { type: patientSchema, required: true },
    user_id: {
        //only our users can have access to the transaction route
        type: mongoose.Schema.Types.ObjectId,//the transaction id will be gotten from the user model
        ref: "users", //making reference to the users model
        required: true,
      },
    full_name:{type:String,required:true},
    email:{type:String,required:true},
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },
    phoneNumber:{type:String,required:true},
    notes:{ type: String,require:true},
},{
    timestamps:true
});

// Create the Appointment model
const appointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports=appointmentModel;