let name = document.getElementById("name")
let phone = document.getElementById("phone")
let email = document.getElementById("email")
let password = document.getElementById("password")
let confirmPassword = document.getElementById("confirmPassword")
let signupForm = document.getElementById("signupForm")
let getData = document.getElementById("getData");
const API_ENDPOINT = "https://furryfriends-backend.herokuapp.com";

signupForm.onsubmit = (e) => {
    e.preventDefault();

    // validation
    if (password.value != confirmPassword.value) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `Passwords doesn't match!`,
            showConfirmButton: false,
            timer: 1500
        })
        e.preventDefault();
        return;
    }

    if (password.value.length < 8) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Password length must be greater than 8!',
            showConfirmButton: false,
            timer: 1500
        })
        e.preventDefault();
        return;
    }


    fetch(`${API_ENDPOINT}/api/signup`, {
            method: "post",
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                phone: phone.value,
                password: password.value,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(res => {
            if (res.error) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: res.error,
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                console.log(res);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User successfully registered!',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.replace('../html/login.html')

            }

        })
        // getDataFunc()



}