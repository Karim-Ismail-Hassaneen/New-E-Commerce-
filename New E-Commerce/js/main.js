let container = document.querySelector(".container");
let searchInput = document.querySelector("#searchInput");
let categorySelect = document.querySelector("#categorySelect");
let lowPriceInput = document.querySelector("#lowPriceInput")
let highPriceInput = document.querySelector("#highPriceInput")
let applyFilterButton = document.querySelector("#applyFilterButton");
let cartQuantity = document.querySelector("#cartQuantity"); 

let cart = [];

const URL = "https://fakestoreapi.com/products";

const getData = async () => {
    const res = await fetch(URL);
    const data = await res.json()
    return data;
};

const addToCart = (product) => {
    cart.push(product);
    updateCartQuantity();
  };
  const updateCartQuantity = () => {
    cartQuantity.textContent = cart.length;
  };

  
const displayProducts = async () => {
    let query = searchInput.value.toLowerCase();
    let selectedCategory = categorySelect.value;
    let lowPrice = lowPriceInput.value || 0;
    let highPrice = highPriceInput.value || 999999;
    

    const products = await getData();
    
    const filteredProducts = products.filter((product) => {
        const matchesQuery = product.title.toLowerCase().includes(query);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesPrice = product.price >= lowPrice && product.price <= highPrice;

        return matchesQuery && matchesCategory && matchesPrice;
    });
    const displayData = filteredProducts.map((product) => {
        return `
        <div class="products-grid">
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image" src="${product.image}" />
            </div>
            <div class="product-name limit-text-to-2-lines">${product.title}</div>
            <div class="product-rating-container">
              <div class="product-rating-count link-primary">${product.rating.rate}</div>
            </div>
            <div class="product-price">$${product.price}</div>
            <button id="addToCart" class="add-to-cart-button button-primary data-product='${JSON.stringify(product)}">Add to Cart</button>
          </div>
          <div class="product-spacer"></div>
        </div> `;
    }).join("")
    container.innerHTML = displayData;
    document.querySelectorAll(".add-to-cart-button").forEach(button => {
        button.addEventListener("click", (e) => {
          const product = JSON.parse(e.target.getAttribute('data-product'));
          addToCart(product);
        });
      });
    
};

searchInput.addEventListener('input', displayProducts);
applyFilterButton.addEventListener('click', displayProducts);
displayProducts()


