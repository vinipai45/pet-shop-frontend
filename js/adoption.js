let cardContainer = document.getElementById('cardContainer')

const API_ENDPOINT = "https://furryfriends-backend.herokuapp.com"

const displaySpinner = () => {
    cardContainer.innerHTML = `
        <center><div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div></center>
    `;
}

const displayCard = (data) => {
    let cardHtml = '';
    data.map(animal => {
        const card = `
            <div class="card container col-xs-6 col-sm-6 col-md-4 col-lg-3 m-2">
                <img src="${animal.photo}" class="card-img-top" style="height:300px;" alt="...">
                <div class="card-body">
                    <button id="${animal._id}" onclick="adoptNow(this.id)" class="btn btn-primary">Adopt</button>
                </div>
            </div>
        `;
        cardHtml += card;
    })
    cardContainer.innerHTML = cardHtml;
}

const adoptNow = (id) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'We will contact you soon!'
    })
}


window.onload = () => {
    if (localStorage.getItem('token') == null) {
        window.location.replace('../html/login.html')
    }

    displaySpinner()

    fetch(`${API_ENDPOINT}/api/animals`, {
            method: "get"
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            displayCard(data)
        })
}