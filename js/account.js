let name = document.getElementById('name')
let email = document.getElementById('email')
let phone = document.getElementById('phone')
let saveButtonContainer = document.getElementById('saveButtonContainer')
let informationContainer = document.getElementById('informationContainer');


const API_ENDPOINT = "https://furryfriends-backend.herokuapp.com"


const displayDetails = (user) => {
    name.innerHTML = user.name;
    email.value = user.email;
    phone.value = user.phone
    address.value = user.address
}

const validateEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}

const validatePhone = (phone) => {
    let re = /^[6-9]\d{9}$/;
    return re.test(String(phone));
}

const makeButtonSpinner = () => {
    saveButtonContainer.innerHTML = `
        <center><div class="spinner-border text-primary" role="status">
            <span class="visually-hidden"></span>
        </div></center>
    `;
}

const makeSpinnerButton = () => {
    saveButtonContainer.innerHTML = `
    <button onclick="saveDetails()" type="submit" class="btn btn-primary mt-2">Save </button>
    `;
}

const saveDetails = () => {
    const params = new URLSearchParams(window.location.search)
    let userId = params.get('id');
    makeButtonSpinner();
    if (!validateEmail(email.value)) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `Incorrect email format`,
            showConfirmButton: false,
            timer: 1500
        })
        makeSpinnerButton();
    } else if (!validatePhone(phone.value)) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `Incorrect phone format`,
            showConfirmButton: false,
            timer: 1500
        })
        makeSpinnerButton();
    } else {
        fetch(`${API_ENDPOINT}/api/user/${userId}`, {
                method: "put",
                body: JSON.stringify({
                    email: email.value,
                    phone: phone.value,
                    address: address.value
                }),
                headers: {
                    authorization: localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                makeSpinnerButton()
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Update successful!'
                })
            })
    }


}


window.onload = () => {
    if (localStorage.getItem('token') == null) {
        window.location.replace('../html/login.html')
    }

    email.value = 'loading...'
    address.value = 'loading...'

    makeButtonSpinner()
    const params = new URLSearchParams(window.location.search)
    let userId = params.get('id');

    fetch(`${API_ENDPOINT}/api/user/${userId}`, {
            method: "get",
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            makeSpinnerButton()
            displayDetails(data)
        })
}