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
        card.className = "card"
        card.innerHTML = `
            <img src=${product.images[0]} alt="">
            
            <p>${product.title}</p>
            <div class="card_price">
                <strong>${product.price}$</strong>
                <button>By now</button>
            </div>
        `;
        wrapper.appendChild(card)
    });
}
btn.addEventListener("click",()=>{
    offset++
    getData("products", offset)

})

async function getCategory(endpoint) {
    const response = await fetch(`${BASE_URL}/${endpoint}`)
    response
        .json()
        .then(res => createCategory(res))
}
getCategory("products/category-list")

function createCategory(data){
    data.forEach((item)=>{
        const liEl = document.createElement("li")
        const dataElm = document.createElement("data")
        liEl.className = "category__item"
        dataElm.innerHTML = item
        dataElm.setAttribute("value", `/category/${item}`)

        dataElm.addEventListener("click",(e)=>{
            getData(`products${e.target.value}`,offset)
        })
        console.log(dataElm)
        liEl.appendChild(dataElm)
        category.appendChild(liEl)
        
    })
}
