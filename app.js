const wrapper = document.querySelector(".wrapper")
const loading = document.querySelector(".loading")
const btn = document.querySelector(".btn")
const category = document.querySelector(".category")

const BASE_URL = "https://dummyjson.com"

let limitCount = 30
let offset = 1

async function getData(endpoint, count) {
   const response = await fetch(`${BASE_URL}/${endpoint}?limit=${limitCount * count}`)
   response
        .json()
        .then(res => createProduct(res))
        .catch(er => console.log(er))
        .finally(()=> {
            loading.style.display = "none"
        })
}
getData("products", offset)

function createProduct(data){
    while(wrapper.firstChild){
        wrapper.firstChild.remove()
    }
    data.products.forEach(product => {
        const card = document.createElement("div")
        card.dataset.id = product.id
        card.className = "card"
        card.innerHTML = `
            <img src=${product.images[0]} class="card__image" alt="${product.title}">
            
            <h3>${product.title}</h3>
            <div class="card_price">
                <strong>${product.price}$</strong>
                <button>Buy</button>
            </div>
        `;
        wrapper.appendChild(card)
    });
}


async function getCategory(endpoint) {
    const response = await fetch(`${BASE_URL}/${endpoint}`)
    response
        .json()
        .then(res => createCategory(res))
}
getCategory("products/category-list")

let categoryType = "products"

function createCategory(data){
    data.forEach((item)=>{
        const liEl = document.createElement("li")
        const dataElm = document.createElement("data")
        liEl.className = "category__item"
        dataElm.innerHTML = item
        dataElm.setAttribute("value", `/category/${item}`)

        dataElm.addEventListener("click",(e)=>{
            categoryType = "products/" + e.target.value
            getData(categoryType,offset)
        })
        console.log(dataElm)
        liEl.appendChild(dataElm)
        category.appendChild(liEl)
        
    })
}
btn.addEventListener("click",()=>{
    offset++
    getData(categoryType, offset)

})

wrapper.addEventListener("click", (event)=>{
    if(event.target.className === "card__image"){
        let id = event.target.closest(".card").dataset.id
        open(`/pages/product.html?q=${id}` , "_self")
    }
})