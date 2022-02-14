// Client facing scripts here
// const accountSid = 'AC41beb9007c846c77c6b5cd581bf4b80b';
// const authToken = '37e5c34a613fc54aab9fa7b449a37099';
// const client = require('twilio')(accountSid, authToken);
$(document).ready(function () {
  const $topRow = $(".top-row");
  const $link = $(".single-listing");
  const $textMessage = $("#send-text");

  $textMessage.on("click", function (e) {
    e.preventDefault();
    console.log("from the text messga button", e.target.id);
    //     POST https://api.twilio.com/2010-04-01/Accounts/AC41beb9007c846c77c6b5cd581bf4b80b/Messages.json \
    // --data-urlencode "Body=Hello from Twilio" \
    // --data-urlencode "From=+18126132228" \
    // --data-urlencode "To=+12506811829" \
    // -u AC41beb9007c846c77c6b5cd581bf4b80b:$TWILIO_AUTH_TOKE
    // const client = require('twilio')(accountSid, authToken);
    // client.messages
    //       .create({
    //          body: 'This will be the body of the new message!',
    //          from: '+18126132228',
    //          to: '+12506811829'
    //        })
    //       .then(message => console.log(message.sid));

    $.ajax({
      url: "https://api.twilio.com/2010-04-01/Accounts/AC41beb9007c846c77c6b5cd581bf4b80b/Messages.json",
      method: "POST",
      dataType: "json",
      data: { Body: "Hello from Twilio", From: '+18126132228', To: '+12506811829', 'AC41beb9007c846c77c6b5cd581bf4b80b':'37e5c34a613fc54aab9fa7b449a37099'},
      success: (data) => {
        console.log("from our new mesage data", data);
      },
      error: (error) => {
        console.log("this request failed and this was the error", error);
      },
    });




  });

  const $addListing = function (listing) {
    const $listingContainer = `<article class= "listing-container">
    <a name="imagelink" class="single-listing" href="/single_listing"><img class="img-pic" src='${listing.photo_url}' id='${listing.id}'/></a>
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
