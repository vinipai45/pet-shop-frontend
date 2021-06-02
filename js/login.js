let email = document.getElementById("email")
let password = document.getElementById("password")
let loginForm = document.getElementById("loginForm")
let loginButtonDiv = document.getElementById('loginButtonDiv')
const API_ENDPOINT = "https://furryfriends-backend.herokuapp.com";

const makeButtonSpinner = (loginButtonDiv) => {
    loginButtonDiv.innerHTML = `
        <center><div class="spinner-border text-primary" role="status">
            <span class="visually-hidden"></span>
        </div></center>
    `;
}

const makeSpinnerButton = (loginButtonDiv) => {
    loginButtonDiv.innerHTML = `
        <button type="submit" class="btn btn-primary btn-block">Log in</button>
    `;
}

loginForm.onsubmit = async(e) => {
    e.preventDefault();
    makeButtonSpinner(loginButtonDiv);
    fetch(`${API_ENDPOINT}/api/signin`, {
            method: "post",
            body: JSON.stringify({
                email: email.value,
                password: password.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            if (res.error) {
                makeSpinnerButton(loginButtonDiv)
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `Incorrect email or password`,
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })

                window.localStorage.setItem('token', res.token)
                window.localStorage.setItem('_id', res.user._id)
                window.localStorage.setItem('name', res.user.name)
                window.location.replace('index.html')
            }
        })


}