const btnLogin = document.getElementById('btnlogin');

const loginUser = async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:5000/login',
            data: {
                email: email,
                password: password,
            }
        });

        console.log(response.data.success)

        // Check the success flag from the response
        if (response.data.success===true) {
            window.location.href = "./home.html";
        } else {
            alert("Incorrect login details");
        }

    } catch (error) {
        console.error('Login error:', error);
        alert("An error occurred. Please try again.");
    }
}

btnLogin.addEventListener("click", loginUser);
