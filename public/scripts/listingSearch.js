// Client facing scripts here

// const  Router  = require("express");

// Client facing scripts here
$(document).ready(function () {
  const $topRow = $(".top-row");
  const $button = $(".search");
  document.cookie = "hello";

  $button.on("click", function (event) {
    console.log("this", $(this));
    event.preventDefault();
    $topRow.empty();
    const $addListing = function (listing) {
      const $listingContainer = `<article>
      <img src='${listing.photo_url}' />
      <h3>${listing.title}</h3>
      <h3>${listing.city}</h3>
      <h3>${listing.price}</h3>
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
