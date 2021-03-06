// Client facing scripts here
// const accountSid = 'AC41beb9007c846c77c6b5cd581bf4b80b';
// const authToken = 'aee403aa64698b8e583e1230828db89a';
//const {sendText} = require('./sms.js');
//function (require) { const sendText = require('./sms.js'); });

//$(function() { window.sendText = sendText});

$(document).ready(function () {
  const $topRow = $(".top-row");
  const $link = $(".single-listing");
  const $textMessage = $("#send-text");
  let $currentListing = 0;

  const $addListing = function (listing) {
    localStorage.clear();

    const $listingContainer = `
    <article class= "listing-container">
    <div class="mylist-div">
    <div class="singlelist-pic">
    <img class="img-pic" src='${listing.photo_url}' id='${listing.id}'/>
    <h3 class="desc single-desc">${listing.title}</h3>
    <button class="fave single-fave" id="${listing.id}">Favorite</button>
    </div>
    <div class="mylist-content">
    ${
      listing.isactive === "false"
        ? `<img class="sold-pic" src='https://github.com/bkcatton/castanetTwo/blob/master/public/images/Sold.png?raw=true'/>`
        : `<h3>Active</h3>`
    }
    <h3 class="city">City: ${listing.city}</h3>
    <h3 class="price">Asking Price: $${listing.price}</h3>
    <h3>Address: ${listing.street_name_number}</h3>
    <h3>Postal Code: ${listing.postal_code}</h3>
    <h3>Square Footage: ${listing.sq_ft} square feet</h3>
    <h3>Property Type: ${listing.property_type}</h3>
    <h3>Number of Bedrooms: ${listing.bedroom_number}</h3>
    <h3>Number of Bathrooms: ${listing.bathroom_number}</h3>
    <h3>Number of Parking Spaces: ${listing.parking_spaces}</h3>
    </div>
    </div>


    </article>`;
    return $listingContainer;
  };
  const renderListing = function (listings) {
    for (let listing of listings) {
      const $item = $addListing(listing);
      $(".top-row").append($item);
      $currentListing = listing.id;
    }
  };
  const loadListings = function () {
    $.ajax({
      url: "http://localhost:8080/api/singleListing",
      method: "GET",
      dataType: "json",
      data: { id: localStorage.getItem("singleListingId") },
      success: (data) => {
        console.log("from our new data obj", data);
        renderListing(data.listing);
      },
      error: (error) => {
        console.log("this request failed and this was the error", error);
      },
    });
  };

  //this will load all listings here
  loadListings();
  $textMessage.on("submit", function (e) {
    e.preventDefault();
    console.log("from the text messga button", e.target.id);
    const $messageBody = $("#message-body");
    const $buyerNumber = $("#buyer_number");
    const $buyerName = $("#buyer_name");
    // console.log($buyerNumber);
    // console.log($messageBody);
    console.log($currentListing);

    $.ajax({
      url: "http://localhost:8080/api/sendTextFromListings",
      method: "GET",
      dataType: "json",
      data: {
        message: $messageBody.val(),
        buyer_number: $buyerNumber.val(),
        currentListing: $currentListing,
        buyer_name: $buyerName.val(),
      },
      success: (data) => {
        console.log("from our new data obj and button", data);
        $messageBody.val("");
        $buyerNumber.val("");
      },
      error: (error) => {
        console.log("this request failed and this was the error", error);
      },
    });
    $textMessage.trigger("reset");
  });
  $(document).on("click", ".fave", addFavorite);
});

// adds a listing to the users favorites

const addFavorite = function (event) {
  const id = this.id;
  this.style.backgroundColor = "rgb(49, 207, 44)";
  this.style.color = "black";
  this.innerHTML = "Added";

  $.post(`/api/featuredListings/${id}`);
};
