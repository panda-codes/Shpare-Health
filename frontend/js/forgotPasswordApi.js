const btn = document.getElementById('sumbtn');

// Clear the form after submission
const refreshForm = () => {
    document.getElementById('email').value = "";
}

// Forgot password function
const forgotPassword = async () => {
    event.preventDefault(); // Prevent form submission
    
    const email = document.getElementById('email').value;
    console.log(email);
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }

    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:5000/forgotpassword',
            data: {
                email:email,
            }
        });

        console.log(response);

        alert('Check your email for the reset code');
        
        // Clear the form after 1 second
        setTimeout(refreshForm, 1000);

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

// Add event listener to the button
btn.addEventListener("click", forgotPassword);
