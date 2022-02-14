// Client facing scripts here
// const accountSid = 'AC41beb9007c846c77c6b5cd581bf4b80b';
// const authToken = 'aee403aa64698b8e583e1230828db89a';
//const {sendText} = require('./sms.js');
//function (require) { const sendText = require('./sms.js'); });

//$(function() { window.sendText = sendText});

$(document).ready(function () {

  const $topRow = $(".top-row");
  const $link = $(".single-listing");
  const $textMessage = $("#send-text")

  $textMessage.on("click", function (e) {
    e.preventDefault();
    console.log("from the text messga button", e.target.id);
      $.ajax({
        url: "http://localhost:8080/api/sendText",
        method: "GET",
        dataType: "json",
        data: { id: localStorage.getItem("singleListingId") },
        success: (data) => {
          console.log("from our new data obj and button", data);
        },
        error: (error) => {
          console.log("this request failed and this was the error", error);
        },
      });
  });

  const $addListing = function (listing) {
    localStorage.clear();

    const $listingContainer = `<article class= "listing-container">
    <img class="img-pic" src='${listing.photo_url}' id='${listing.id}'/>
  <h3 class="desc">${listing.title}</h3>
  <h3 class="city">${listing.city}</h3>
  <h3 class="price">Asking Price: $${listing.price}</h3>
  <h3>${listing.street_name_number}</h3>
  <h3>${listing.postal_code}</h3>
  <h3>Square Footage: ${listing.sq_ft} square feet</h3>
  <h3>Property Type: ${listing.property_type}</h3>
  <h3>Number of Bedrooms: ${listing.bedroom_number}</h3>
  <h3>Number of Bathrooms: ${listing.bathroom_number}</h3>
  <h3>Number of Parking Spaces:${listing.parking_spaces}</h3>
  </article>`;

    return $listingContainer;
  };
  const renderListing = function (listings) {
    for (let listing of listings) {
      const $item = $addListing(listing);
      $(".top-row").append($item);
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
  loadListings();

});


