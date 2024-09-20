const btn= document.getElementById('appointBtn');

const refreshForm=()=>{
    document.getElementById('email').value="";
    document.getElementById('date').value="";
    document.getElementById('time').value="";
    document.getElementById('name').value="";
    document.getElementById('message').value="";
    document.getElementById('phone').value="";
}

const appointment = async() =>{
    event.preventDefault();
// const department = document.getElementById('exampleFormControlSelect1').value;
const email = document.getElementById('email').value;
const date = document.getElementById('date').value;
const time = document.getElementById('time').value;
const name = document.getElementById('name').value;
const phoneNum = document.getElementById('phone').value;
const message = document.getElementById('message').value;




    const response = await axios({
          method:'post',
          url:'http://localhost:5000/home',
          data: {
            full_name:name,
            email:email,
            appointmentDate:date,
            appointmentTime:time,
            phoneNumber:phoneNum,
            notes:message,
          }
        })


        alert('appointment scheduled');

        setTimeout(refreshForm,1000);
}



btn.addEventListener("click",appointment);