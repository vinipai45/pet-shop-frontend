let carouselImageContainer = document.getElementById('carouselImageContainer');
let bottomCardContainer = document.getElementById('bottomCardContainer')
const API_ENDPOINT = "https://furryfriends-backend.herokuapp.com"

const displayImages = (data) => {
    let imageContainerHtml = '';
    data.map(animal => {
        const img = `
        <div class="carousel-item">
            <img src="${animal.photo}" class="_carouselImg w-30" alt="loading...">
        </div>
        `;
        imageContainerHtml += img
    })

    carouselImageContainer.innerHTML += imageContainerHtml;
}

const displayBottomCards = (data) => {
    console.log("called");
    let bottomCardHtml = '';
    data.map(animal => {
        const card = `
        <div class="col-md-3">
            <div class="card _bottomCard" style="width: 18rem;">
                <img src="${animal.photo}" class="card-img-top p-3" alt="...">
            </div>
        </div>
        `;
        bottomCardHtml += card;
    })
    bottomCardContainer.innerHTML = bottomCardHtml;
}

window.onload = () => {
    fetch(`${API_ENDPOINT}/api/animals`, {
            method: "get"
        }).then(res => res.json())
        .then(data => {
            displayImages(data)
            displayBottomCards(data)
        })
}