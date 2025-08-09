 var swiper = new Swiper(".mySwiper", {

  loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    const cartIcon = document.querySelector(".cart-icon");
    const cartTab = document.querySelector(".cart-tab");
    const closeBtn = document.querySelector(".close-btn");
    const cardList = document.querySelector(".card-list");
    const cartList = document.querySelector(".cart-list");
    const cartTotal = document.querySelector(".cart-total");
    const cartValue = document.querySelector(".cart-value");
    const hambuger = document.querySelector(".hambuger");
    const mobileMenu  = document.querySelector(".mobile-menu");
    const bars = document.querySelector(".fa-bars");
    // Elements
const signinBtn = document.querySelector("#signin"); // Make sure your Sign In button has id="signin"
const signinModal = document.querySelector("#signin-modal");
const closedBtn = document.querySelector("#close-signin");


  cartIcon.addEventListener('click' , ()=> cartTab.classList.add('cart-tab-active'));
  closeBtn.addEventListener('click' , ()=> cartTab.classList.remove('cart-tab-active') );
  hambuger.addEventListener('click' , ()=> mobileMenu.classList.toggle('mobile-menu-active'));
    hambuger.addEventListener('click' , ()=> bars.classList.toggle('fa-xmark'));
  let productList = [];
  let cartProduct = [];

  const updateTotals = () =>{
      let totalPrice = 0;
      let totalQunatity = 0;


      document.querySelectorAll('.item').forEach(item =>{

        const quantity = parseInt(item.querySelector('.quantity-value').textContent)
         const price = parseFloat(item.querySelector('.item-total').textContent.replace('$',''));

         totalPrice += price;
         totalQunatity += quantity;
      });

      cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
      cartValue.textContent = totalQunatity;
  }

  const showCards=()=>{
              productList.forEach(product =>{
                        
                const orderCard = document.createElement('div');
                orderCard.classList.add('order-card');

                orderCard.innerHTML=` <div class="card-img">
                        <img src="${product.image}" >
                     </div>
                     <h4>${product.name}</h4>
                     <h4 class="price">${product.price}</h4>
                     <a href="#" class="btn card-btn">add to cart </a>`;

                     cardList.appendChild(orderCard);

                      const cardBtn = orderCard.querySelector('.card-btn');
                      cardBtn.addEventListener('click', (e)=>{
                        e.preventDefault();
                         addToCart(product);
                      })

              })
  };
  const addToCart=(product)=>{
            
    var quantity=1;
    var price = parseFloat(product.price.replace('$',''))


             const existingProduct = cartProduct.find(item => item.id === product.id)

             if(existingProduct){
              alert("item already in your cart!");
              return;
             }
             cartProduct.push(product);

    const cartItem = document.createElement('div');
    cartItem.classList.add('item');

    cartItem.innerHTML=`
              <div class="img-container">
                                <img src="${product.image}" alt="">
                            </div>
                            <div>
                                <h4>${product.name}</h4>
                                <h4 class="item-total">${product.price}</h4>
                            </div>
                            <div  class="flex">
                                <a href="#" class="quantity-btn minus">
                                    <i class="fa-solid fa-minus"></i>
                                    
                                </a>
                                <h4 class="quantity-value">${quantity}</h4>
                                <a href="#" class="quantity-btn plus">
                                    <i class="fa-solid fa-plus"></i>
                                    
                                </a>
                            </div>
    `;
               cartList.appendChild(cartItem);
                       

               const plusBtn = cartItem.querySelector('.plus');
               const quantityValue  = cartItem.querySelector('.quantity-value');
               const itemTotal = cartItem.querySelector('.item-total');

               plusBtn.addEventListener('click', (e)=>{
                e.preventDefault();
                quantity++;
                quantityValue.textContent= quantity;
                itemTotal.textContent = `$${(price * quantity).toFixed(2)}`
                 updateTotals();
               })

                 const minusBtn = cartItem.querySelector('.minus');
              //  const quantityValue  = cartItem.querySelector('.quantity-value');
               minusBtn.addEventListener('click', (e)=>{
                e.preventDefault();
                if(quantity>0){
                
                quantity--;
                quantityValue.textContent= quantity;
                 itemTotal.textContent = `$${(price * quantity).toFixed(2)}`
                  updateTotals();
              }
              
                else{
                  cartItem.remove();
                  cartProduct = cartProduct.filter(item => item.id !== product.id);
                }
               })

           updateTotals();
  }



  const initApp = ()=>{
           fetch('products.json').then
           (response => response.json()).then
           (data =>{
            productList = data;
           showCards();
            
           })
  }
  initApp();

  // Show modal
signinBtn.addEventListener("click", () => {
  signinModal.style.display = "block";
});

// Hide modal
closedBtn.addEventListener("click", () => {
  signinModal.style.display = "none";
});

// Hide if clicked outside
window.addEventListener("click", (e) => {
  if (e.target === signinModal) {
    signinModal.style.display = "none";
  }
});