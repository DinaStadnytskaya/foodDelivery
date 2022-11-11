const cartFunction = () => {
   const cartButton = document.getElementById('cartButton');   
   const modal = document.getElementById('myModal2');
   const modalBody = modal.querySelector('#modalBody')
   const buttonSend = modal.querySelector('#buttonSend')
   const priceTag = modal.querySelector('.modal-pricetag')

   //2
   const commonSum = (array) => {
      let sum = 0;
      for (let i = 0; i < array.length; i += 1) {
         let productSum = array[i].price * array[i].count;
         sum += productSum;
      }
      priceTag.innerText = `${sum} грн.`;
   }
   //3
   const resetCart = () => {
      modalBody.innerHTML = '';
      localStorage.removeItem('cart');
      commonSum(array)
   }
   //4
   const plus = (id) => {
      const cartArray = JSON.parse(localStorage.getItem('cart'))
      cartArray.map((item) => {
         if (item.id === id) {
            item.count += 1;
         }
         return item
      })
      localStorage.setItem('cart', JSON.stringify(cartArray))
      renderItems(cartArray)
      commonSum(cartArray)
   }

   //5
   const minus = (id) => {
      const cartArray = JSON.parse(localStorage.getItem('cart'))
      cartArray.map((item) => {
         if (item.id === id) {
            item.count = item.count > 0 ? item.count - 1 : 0
         }
         return item
      })
      localStorage.setItem('cart', JSON.stringify(cartArray))
      renderItems(cartArray)
      commonSum(cartArray)
   }

   //6
   const renderItems = (data) => {
      modalBody.innerHTML = '';
      data.forEach(({ name, price, id, count }) => {
         sum = price * count;
         const cartProd = document.createElement('div');
         cartProd.classList.add('food-row');
         cartProd.innerHTML = `
                     <div class="food-name">${name}</div>
                     <div class="food-price">${price}</div>
                     <div class="food-counter">
                        <button class="counter-button minus" data-index="${id}">-</button>
                        <span class="counter">${count}</span>
                        <button class="counter-button plus" data-index="${id}">+</button>
                     </div>
                     <!--/food-counter -->
                     <div class="food-sum">${price * count}</div>
                     <div class="icon-close" data-index="${id}"></div>
                         `
         modalBody.append(cartProd);
      })
   }
   const removeFromCart = (id) => {
      const cartArray = JSON.parse(localStorage.getItem('cart'))
      let result = cartArray.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(result));
      renderItems(result)
      commonSum(result)
   }

   modalBody.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('icon-close')) {
         e.target.closest('.food-row').innerText = '';
         removeFromCart(e.target.dataset.index);
      }
   })


   //https://jsonplaceholder.typicode.com/posts
   modalBody.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('plus')) {
         plus(e.target.dataset.index);
      } else if (e.target.classList.contains('minus')) {
         minus(e.target.dataset.index);
      }
   })
   buttonSend.addEventListener('click', () => {
      const cartArray = localStorage.getItem('cart');
      fetch('https://jsonplaceholder.typicode.com/posts', {
         method: 'POST',
         body: cartArray
      })
         .then(response => {
            if (response.ok) {
               resetCart();
            }
         })
         .catch(e => {
            console.error(e);
         })

   })
   cartButton.addEventListener('click', () => {
      if (localStorage.getItem('cart')) {
         const cartArray = JSON.parse(localStorage.getItem('cart'))
         renderItems(cartArray)
         commonSum(cartArray)
      }
   })  
}
cartFunction();

