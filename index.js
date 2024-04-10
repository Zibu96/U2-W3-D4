const fetchBooks = () => {
  fetch(" https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log(response);

      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("Bad Request");
        }
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        if (response.status === 403) {
          throw new Error("Forbidden");
        }
        if (response.status === 404) {
          throw new Error("Not Found");
        }
        if (response.status === 500) {
          throw new Error("Server Error");
        }

        throw new Error("Generic Fetch Error");
      }
    })
    .then((booksData) => {
      console.log(booksData);

      const row = document.getElementById("booksRow");

      booksData.forEach((book) => {
        const col = document.createElement("col");
        col.classList.add("col");
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `<div class="card">
      <img src=${book.img} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">${book.price}</p>
        <a href="#" class="btn btn-primary buyBtn">Acquista</a>
        <a href="#" class="btn btn-secondary deleteBtn">Scarta</a>
      </div>
    </div>`;

        const cart = document.querySelector(".dropdown-menu");
        const buyBtn = document.querySelectorAll(".buyBtn");
        const bookList = [];
        const addToCart = function (event) {
          const buyBtn = event.target;

          const title = document.querySelector(".card-title").textContent;
          const price = document.querySelector(".card-text").textContent;
          const onCart = document.createElement("li");
          bookList.push({ titolo: title, prezzo: price });
          onCart.innerHTML = title + price;
          buyBtn = cart.appendChild(onCart);
        };
        buyBtn.forEach((btn) => {
          btn.addEventListener("click", addToCart);
        });

        const deleteCard = function (event) {
          const deleteBtn = event.target;
          const col = deleteBtn.closest(".col");
          col.remove();
        };
        const deleteBtn = document.querySelectorAll(".deleteBtn");
        deleteBtn.forEach((btn) => {
          btn.addEventListener("click", deleteCard);
        });

        col.appendChild(card);
        row.appendChild(col);
      });
    });

  //   deleteBtn.addEventListener("click", () => card.remove());
};

window.onload = () => {
  fetchBooks();
};
