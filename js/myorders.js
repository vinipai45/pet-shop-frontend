let detailsdiv = document.getElementById('detailsdiv')
let mainRow = document.getElementById('mainRow')
let total = document.getElementById('total')

const API_ENDPOINT = "https://furryfriends-backend.herokuapp.com"

const displayImage = (data) => {
    let imgHtml = '';

    data.map(product => {
        const img = `
        <img src ="${product.photo}" alt="image here..." style="width:50%"/>
    `;
        imgHtml += img;

    })

    return imgHtml;
}

const displayDetails = (data) => {
    let detailsHtml = '';
    data.map(product => {
        const details = `
        <div class="row">
            <img class="col-sm-6 col-lg-3" src ="${product.photo}" alt="image here..."/>
            <div class="col">
            <table class="table table-striped table-hover row" cellpadding="10" cellspacing="5">
                <tr>
                    <td>Name</td>
                    <td>${product.name}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>${product.description}</td>  
                </tr>
                <tr>
                    <td>Categoty</td>
                    <td>${product.category.name}</td> 
                </tr>
                <tr>
                    <td>Price</td>
                    <td>&#8377;${product.price}</td>
                </tr>
            </table>
            <div id="cancelOrderButtonDiv">
                <button id="${product._id}" onclick="cancelOrder(this.id)" class="btn btn-danger row mb-3">Cancel</button>
            </div>
            </div>
        </div>
    `;
        detailsHtml += details;
    })
    detailsdiv.innerHTML = detailsHtml;
}

const makeButtonSpinner = (container) => {
    container.innerHTML = `
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden"></span>
        </div>
    `;
}

const cancelOrder = (id) => {

    let cancelOrderButtonDiv = document.getElementById('cancelOrderButtonDiv')
    makeButtonSpinner(cancelOrderButtonDiv);

    fetch(`${API_ENDPOINT}/api/product/unorder`, {
            method: "put",
            body: JSON.stringify({
                productId: id
            }),
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            if (!data.success) {
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
                    icon: 'error',
                    title: data.message
                })
                window.location.reload()
            } else {
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
                    title: data.message
                })
                window.location.reload();
            }
        })
}

const calculateTotalPrice = (data) => {
    let totalPrice = 0;
    data.map(product => {
        totalPrice += product.price;
    })
    total.innerHTML = `Total : &#8377;${totalPrice}`
}

const displaySpinner = () => {
    console.log('called');
    detailsdiv.innerHTML = `
        <center><div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div></center>
    `;
}

window.onload = () => {
    if (localStorage.getItem('token') == null) {
        window.location.replace('login.html')
    }

    displaySpinner();

    fetch(`${API_ENDPOINT}/api/myorder/user/${localStorage.getItem('_id')}`, {
            method: "get",
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(res => res.json())
        .then(data => {
            displayDetails(data);
            calculateTotalPrice(data);
            console.log(data);
        })
}