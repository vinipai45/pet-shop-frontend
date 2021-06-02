let username = document.getElementById('username')
let cardContainer = document.getElementById('cardContainer')
let categoryContainer = document.getElementById('categoryContainer')
let signoutButton = document.getElementById('signoutButton')
let searchButtonContainer = document.getElementById('searchButtonContainer');
let search = document.getElementById('search');
let query = document.getElementById('query')
var allProductsNames = [];

const API_ENDPOINT = "https://furryfriends-backend.herokuapp.com"


const displayCard = (data) => {
    let cardHtml = '';
    data.map(product => {
        const card = `
            <div class="card col-sm-6 col-md-4 col-lg-3 style="width:10%">
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
    cardContainer.innerHTML = cardHtml;
}

const displayCategory = (data) => {
    let categoryHtml = '';
    data.map(category => {
        const icon = `
            <i id="${category._id}" onclick="getProductByCategory(this.id)" class="fas fa-3x fa-${category.name}" style="width:5%"></i>
        `;
        categoryHtml += icon;
    })
    categoryContainer.innerHTML = categoryHtml + categoryContainer.innerHTML;


}

const byNow = (id) => {
    window.location.href = '../html/details.html?id=' + id;
}

const displayRelatedCards = (data) => {
    let cardHtml = '';
    data.map(product => {
        const card = `
            <div class="card col-sm-6 col-md-4 col-lg-3 style="width:10%">
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
    cardContainer.innerHTML = cardHtml;
}

const getProductByCategory = (id) => {
    fetch(`${API_ENDPOINT}/api/products/${id}`, {
            method: "get"
        }).then(res => res.json())
        .then(data => {
            console.log(id);
            displayRelatedCards(data);
        })
}

const makeButtonSpinner = () => {
    searchButtonContainer.innerHTML = `
        <div class="spinner-border text-success" role="status">
            <span class="visually-hidden"></span>
        </div>
    `;
}

const makeSpinnerButton = () => {
    searchButtonContainer.innerHTML = `
    <button class="btn btn-outline-success" type="submit">Search</button>
    `;
}

const displaySpinner = () => {
    cardContainer.innerHTML = `
        <center><div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div></center>
    `;
}

search.onsubmit = (e) => {
    e.preventDefault();
    makeButtonSpinner(searchButtonContainer);
    fetch(`${API_ENDPOINT}/api/search-products`, {
            method: "post",
            body: JSON.stringify({
                query: query.value
            }),
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')
            }
        }).then(res => res.json())
        .then(data => {
            makeSpinnerButton()
            displayCard(data.product)
        })
}

username.onclick = () => {
    console.log("clicked username");
    window.location.href = '../hmtl/account.html?id=' + localStorage.getItem('_id')
}

signoutButton.onclick = () => {

    localStorage.clear();
    window.location.replace("../html/login.html")
}

window.onload = () => {
    if (localStorage.getItem('token') == null) {
        window.location.replace('../html/login.html')
    }

    console.log(localStorage.getItem('name'));
    username.innerHTML = localStorage.getItem('name')

    displaySpinner()
        //fetch all products
    fetch(`${API_ENDPOINT}/api/products`, {
            method: "get"
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            displayCard(data)
            data.map(product => {
                allProductsNames.push(product.name)
            })
        })

    //fetch all categories
    fetch(`${API_ENDPOINT}/api/categories`, {
            method: "get"
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            displayCategory(data)
        })

}