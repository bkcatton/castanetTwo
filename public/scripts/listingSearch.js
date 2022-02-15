// Client facing scripts here

// const  Router  = require("express");

// Client facing scripts here
$(document).ready(function () {
  const $topRow = $(".top-row");
  const $button = $(".search");
  // document.cookie = "hello";

  $button.on("click", function (event) {
    console.log("this", $(this));
    event.preventDefault();
    $topRow.empty();

    const $addListing = function (listing) {
      localStorage.clear();

      $(".top-row").on("click", (e) => {
        console.log("this is in the onclick", e.target.id);
        localStorage.setItem("singleListingId", e.target.id);
      });
      const $listingContainer = `<article class="listing-container">
      <a name="imagelink" class="" href="/single_listing"><img class="img-pic" src='${listing.photo_url}' id='${listing.id}'/></a>
      ${listing.isactive === 'false' ? `<img class="img-pic" src='https://github.com/bkcatton/castanetTwo/blob/master/public/images/Sold.png?raw=true'/>` : `<h3>Active</h3>` }
      <h3 class="desc">${listing.title}</h3>
      <h3 class="city">${listing.city}</h3>
      <h3 class="price">${listing.price}</h3>
      <button class="fave" id="${listing.id}"> Favorite </button>
      </article>`;
      return $listingContainer;
    };
    const renderListing = function (city) {
      console.log("CITYSDFADFADSFDSAFDSA", city.city);
      const listings = city.city;

      for (let listing of listings) {
        console.log("CITY LISTING", listing);
        const $item = $addListing(listing);
        $(".top-row").append($item);
      }
    };
    $(".button-search").on("submit", (event) => {
      console.log("hello");
    });
    const $inputCity = $(".input-city").val();
    let $inputPrice = $(".input-price").val();
    if ($inputPrice < 1) {
      $inputPrice = 10000000;
    }

    const loadListings = function () {
      $.ajax({
        url: `http://localhost:8080/api/listingSearch`,
        method: "GET",
        dataType: "json",
        data: { cityName: $inputCity, price: $inputPrice },
        success: (data) => {
          const $inputValue = $(".input-search").val();

          renderListing(data);
        },
        error: (error) => {
          console.log("this request failed and this was the error", error);
        },
      });
    };
    loadListings();
  });
});
