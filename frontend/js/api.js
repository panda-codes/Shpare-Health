
const btn= document.getElementById('sumbtn');

const signUpUser = async() =>{
    event.preventDefault();
const firstname = document.getElementById('firstname').value;
const email = document.getElementById('email').value;
const birthday = document.getElementById('birthday').value;
const gender = document.getElementById('gender').value;
const password = document.getElementById('password').value;

    console.log(firstname)

    const response = await axios({
          method:'post',
          url:'http://localhost:5000/signup',
          data: {
            firstname:firstname,
            email:email,
            birthday:birthday,
            gender:gender,
            password:password,
          }
        })

        console.log(response);

        window.location.href="./login.html"
}



btn.addEventListener("click",signUpUser);
