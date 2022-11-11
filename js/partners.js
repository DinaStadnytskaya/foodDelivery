const cardsRestaurants = document.querySelector('.cards-restaurants')
const renderItems = (data) => {
   data.forEach((item) => {
      const { image, kitchen, name, price, products, stars, time_of_delivery } = item
      const a = document.createElement('a')
      a.setAttribute('href', `./${name}.html`)
      a.classList.add('card')
      a.classList.add('card-restaurant')
      a.dataset.products = products;
      a.innerHTML = `<div class="card__photo"><img src="${image}" alt="${name}" class="card-image"></div>
                  <div class="card-text">
                     <div class="card-heading">
                        <div class="card-title">${name}</div>
                        <div class="card-rating"><div class="icon-star-full"></div>${stars}</div>                     
                        <div class="card-tag">${time_of_delivery} минут</div>
                     </div>
                     <!--/card-heading -->
                     <div class="card-info">                                               
                         <div class="card-category">${kitchen}</div>  
                         <div class="card-price">от ${price} грн.</div>
                     </div>
                     <!--/card-info -->
                  </div>
                  <!--/card-text -->
                        `

      a.addEventListener('click', (e) => {
         e.preventDefault();
         localStorage.setItem('restaurant', JSON.stringify(item))
         window.location.href = `./${name}.html`;
      })
      cardsRestaurants.append(a);
   })
}
fetch('./db/db.json')
   .then((response) => response.json())
   .then((data) => {
      renderItems(data)
   })
   .catch((error) => {
      console.log(error);
   })