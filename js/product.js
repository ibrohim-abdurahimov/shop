const content = document.querySelector(".content")
const BASE_URL = "https://dummyjson.com"

async function getData() {
    let query = new URLSearchParams(window.location.search)
    let id = query.get("q")
    const response = await fetch(`${BASE_URL}/products/${id}`)
    response
        .json()
        .then(res => createContent(res))
    
}
getData()

function createContent(data){
    console.log(data)
    content.innerHTML = `
        <div>
            <img src=${data.images[0]} alt="">
        </div>
        <div>
            <h1>${data.title}</h1>
            <h2>${data.price} USD</h2>
            <p>${data.description}</p>
            <button>Buy</button>
            <ul>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
            </ul>
        </div>
    `
}