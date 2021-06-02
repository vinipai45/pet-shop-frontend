let imagediv = document.getElementById('imagediv')
let detailsdiv = document.getElementById('detailsdiv')
let relateddiv = document.getElementById('relateddiv')
var itemId;
const API_ENDPOINT = "https://furryfriends-backend.herokuapp.com"

const displayImage = (image) => {
    let imgHtml = '';
    const img = `
        <img src ="${image}" alt="image here..." style="width:50%"/>
    `;
    imgHtml += img;
    imagediv.innerHTML = imgHtml;
}

const displayDetails = (data) => {
    let detailsHtml = '';
    const details = `
        <table class="table table-striped table-hover" cellpadding="10" cellspacing="5">
            <tr>
                <td>Name</td>
                <td>${data.name}</td>
            </tr>
            <tr>
                <td>Description</td>
                <td>${data.description}</td>  
            </tr>
            <tr>
                <td>Categoty</td>
                <td>${data.category.name}</td> 
            </tr>
            <tr>
                <td>Price</td>
                <td>&#8377;${data.price}</td>
            </tr>
        </table>
        <div id="placeOrderButtonDiv">
            <button onclick="placeOrder(this.id)" id="${data._id}" class="btn btn-warning" style="width:50%">Place order</button>
        </div>  
        `;
    detailsHtml += details;
    detailsdiv.innerHTML = detailsHtml;
}

const displayRelated = (categoryId) => {
    fetch(`${API_ENDPOINT}/api/products/${categoryId}`, {
            method: "get"
        }).then(res => res.json())
        .then(data => {
            displayRelatedCards(data);
        })
}

const makeButtonSpinner = (container) => {
    container.innerHTML = `
        <center><div class="spinner-border text-primary" role="status">
            <span class="visually-hidden"></span>
        </div></center>
    `;
}

const makeSpinnerButton = (container) => {
    container.innerHTML = `
        <button onclick="placeOrder(this.id)" id="${itemId}" class="btn btn-warning" style="width:50%">Place order</button>
    `;
}

const placeOrder = (id) => {

    let placeOrderButtonDiv = document.getElementById('placeOrderButtonDiv')
    makeButtonSpinner(placeOrderButtonDiv);


    fetch(`${API_ENDPOINT}/api/product/order`, {
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
            makeSpinnerButton(placeOrderButtonDiv)
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
                title: data.message1
            })
        })
}

const displayRelatedCards = (data) => {
    let cardHtml = '';
    data.map(product => {
        const card = `
            <div class="card col-lg-2 col-md-3 ms-3">
                <img src="${product.photo}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <button id="${product._id}" onclick="byNow(this.id)" class="btn btn-primary">By Now</button>
                </div>
            </div>
        `;
        cardHtml += card;
    })
    relateddiv.innerHTML = cardHtml;
}

const byNow = (id) => {
    window.location.href = 'details.html?id=' + id;
}

const displaySpinner = () => {
    console.log('called');
    imagediv.innerHTML = detailsdiv.innerHTML = relateddiv.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;
}

window.onload = () => {
    if (localStorage.getItem('token') == null) {
        window.location.replace('login.html')
    }

    const params = new URLSearchParams(window.location.search)
    let productId = params.get('id');
    itemId = productId;
    displaySpinner();
    fetch(`${API_ENDPOINT}/api/product/${productId}`, {
            method: "get"
        }).then(res => res.json())
        .then(data => {
            displaySpinner();
            displayImage(data.photo);
            displayDetails(data);
            displayRelated(data.category._id)
            console.log(data);
        })


}