const btn = document.getElementById('sumbtn');

// Clear the form after submission
const refreshForm = () => {
    document.getElementById('code').value = "";
    document.getElementById('email').value = "";
    document.getElementById('passw').value = "";
}

// Forgot password function
const changePassWord = async () => {
    event.preventDefault(); // Prevent form submission
    
    const resetcode = document.getElementById('code').value;
    const email = document.getElementById('email').value;
    const passw = document.getElementById('passw').value;
    console.log(email);
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }else if(!resetcode){
        alert('Please enter your resetcode');
    }
    else if(!passw){
        alert('Please enter new password');
    }
    

    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:5000/resetpassword',
            data: {
                resetcode:resetcode,
                email:email,
                newpassword:passw
            }
        });

        console.log(response);

        
        // Clear the form after 1 second
        // setTimeout(refreshForm, 1000);

        window.location.href="./login.html"

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

// Add event listener to the button
btn.addEventListener("click", changePassWord);
