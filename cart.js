const selectToCart = document.querySelectorAll(".bttn");
const formHide = document.querySelector(".formHide");
const sectionFirst = document.querySelector("section");
const cartSection = document.querySelector(".cartSection");
const cartDom = document.querySelector(".cart");
const shopCart = document.querySelector(".cartImage");
const shopCartClear = document.querySelector(".cartImageClear");
let cart = [];
let result = 0;
let item = "";

const numberOfItems = document.querySelector(".textCartNum");
const priceOfItems = document.querySelector(".textTotalNum");
const backToCards = document.querySelectorAll(".backToCards");
const orderProducts = document.querySelector('.order');
const cards = document.querySelectorAll(".card");

selectToCart.forEach((selectBtn) => {
  selectBtn.addEventListener("click", () => {
    const productDom = selectBtn.parentNode;

    const tempCartItems = document.querySelectorAll(".cart-item");

    tempCartItems.forEach((cartItem) => {
      let tempText = cartItem.innerText;
      if (tempText.includes(productDom.querySelector(".name").innerText)) {
        cartItem.lastElementChild.innerHTML =
          +cartItem.lastElementChild.innerHTML + 1;
      }
    });

    const product = {
      images: productDom.querySelector(".image").getAttribute("src"),

      name: productDom.querySelector(".name").innerText,

      price: productDom.querySelector(".price span").innerText,

      quantity: 1,
    };
    cards.forEach((card) => {
      let countItemInBasket = card.innerText;
      if (
        countItemInBasket.includes(productDom.querySelector(".name").innerText)
      ) {
        card.children[4].innerText = +card.children[4].innerText + 1;
      }
    });

    const existingProduct = product.hasOwnProperty("quantity");
    if (existingProduct) {
      let quantity = parseInt(product.quantity);
      item += quantity;
      numberOfItems.innerText = item.length;
      cart.length = item.length;
      let cartD = cartDom;
      cartD = cart.length;
    } else if (cart.length !== item.length) {
      console.log("wrong");
    } else {
      cart.push(product.quantity);
    }

    if (cartDom) {
      let priceOld = parseInt(product.price);
      result += priceOld;
      priceOfItems.innerText = result;
      numberOfItems.innerText = cart.length;
    }
    console.log("result", result);

    console.log("in cart currently", existingProduct);

    const inCart =
      cart.filter((cartItem) => cartItem.name === product.name).length > 0;

    if (!inCart) {
      cartDom.insertAdjacentHTML(
        "beforeend",
        `
      
      <div class="cart-item">
      <img class="cart-item-image" src="${product.images}" alt="${product.name}">
      <h3 class="cart-item-name">${product.name}</h3>
      <h3 class="cart-item-price">$<span>${product.price}</span></h3>
      <h3 class="cart-item-quantity">${product.quantity}</h3> 
      </div>
      
     
      `
      );

      cart.push(product);

      selectBtn.innerText = "IN CART";
    }

    return;
  });
});

function clearAll() {
  numberOfItems.textContent = "0";

  if (priceOfItems.textContent !== 0) {
    priceOfItems.textContent = "";
  } else {
    priceOfItems.textContent = "0";
  }
  cart.splice(0, cart.length);
  console.log("In cart", cart);
  cartDom.innerHTML = "";
  result = 0;
  item = "";
  orderProducts.innerHTML = "ORDER";
}
orderProducts.addEventListener("click", () => {
    alert('Your order is being processed');
    clearAll();
    orderProducts.innerHTML = 'DONE';
  });
shopCartClear.addEventListener("click", clearAll);
shopCart.addEventListener("click", () => {
  shopCartClear.classList.remove("blank");
  cartSection.classList.add("visible");
  sectionFirst.classList.add("blank");
  orderProducts.innerHTML = "ORDER";
  formHide.classList.add("blank");
  cards.forEach((card) => {
    card.children[4].innerText = "0";
  });
});
backToCards.forEach((backTo) => {
  backTo.addEventListener("click", () => {
    
    cartSection.classList.remove("visible");
    sectionFirst.classList.remove("blank");
    formHide.classList.remove("blank");
    shopCartClear.classList.add("blank");
    selectToCart.forEach((selectBtn) => {
      selectBtn.innerText = "SELECT";

      priceOfItems.textContent = result;
    });
    cards.forEach((card) => {
      card.children[4].innerText = '';
      card.children[4].innerText = +cart.length ;
      
      card.children[4].innerText = '';
      
      
    });
  });
});
