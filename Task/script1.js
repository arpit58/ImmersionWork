const btn = document.getElementById('btn');
const inp = document.getElementById('inp');
const tempUrl = "https://dummyjson.com/products/search?q=";
const container = document.getElementById('container');
const sortBy = document.getElementById('sortBy');

btn.addEventListener('click', () => {
  const URL = tempUrl + inp.value;
  if (inp.value.trim() !== "") {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        let products = data.products;

        const sortValue = sortBy.value;
        if (sortValue === "price-asc") {
          products.sort((a, b) => a.price - b.price);
        } else if (sortValue === "price-desc") {
          products.sort((a, b) => b.price - a.price);
        } else if (sortValue === "rating-desc") {
          products.sort((a, b) => b.rating - a.rating);
        }

        container.innerHTML = "";

        for (let product of products) {
          const card = document.createElement('div');
          card.className = 'card';

          const img = document.createElement('img');
          img.src = product.images[0];

          const title = document.createElement('h3');
          title.innerText = product.title;

          const price = document.createElement('p');
          price.innerText = "Price: ₹" + product.price;

          const rating = document.createElement('p');
          rating.innerText = "Rating: " + product.rating;

          card.appendChild(img);
          card.appendChild(title);
          card.appendChild(price);
          card.appendChild(rating);
          container.appendChild(card);
        }
      });
  }
});
