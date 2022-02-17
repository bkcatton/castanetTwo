// Client facing scripts here
$(document).ready(function () {
  // custom delete function

  $.delete = function (url, data, callback, type) {
    if ($.isFunction(data)) {
      (type = type || callback), (callback = data), (data = {});
    }
    return $.ajax({
      url: url,
      type: "DELETE",
      success: callback,
      data: data,
      contentType: type,
    });
  };

  //  creates an html structure for a listing

  const $addListing = function (listing) {
    localStorage.clear();

    $(".top-row").on("click", (e) => {
      console.log("this is in the onclick", e.target.id);
      localStorage.setItem("singleListingId", e.target.id);
    });

    const $listingContainer = `<article class="listing-container">
    <div class="mylist-div">
    <div class="mylist-pic" >
    <a name="imagelink" class="" href="/single_listing"><img class="img-pic" src='${
      listing.photo_url
    }' id='${listing.id}'/></a>

    <div class='button-div mylist-btn'>
  <form id="sold-form" method="POST">
  <button id="${
    listing.id
  }" type="submit" class="button-19">  Mark Sold! </button>
    </form>
  <form id="button-form" method="POST">
  <button id="${
    listing.id
  }" type="submit" class="button-36"> Delete Listing </button>
  </form>
    </div>

    </div>
    <div class="mylist-content">
    ${
      listing.isactive === "false"
        ? `<img class="sold-pic" src='https://github.com/bkcatton/castanetTwo/blob/master/public/images/Sold.png?raw=true'/>`
        : `<h3>Active</h3>`
    }

    <h3 class="price">Asking Price: $${listing.price}</h3>
    <h3>City: ${listing.city}</h3>
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

  // passes each listing through addListing and appends them to the dom

  const renderListing = function (myListings) {
    const array = myListings.myListings;
    const container = $(".top-row");
    container.empty();
    for (let listing of array) {
      const $item = $addListing(listing);
      container.prepend($item);
    }
  };

  // querys the db to get listings for renderListing

  const loadListings = function () {
    $.get("/api/myListings")
      .then((data) => {
        console.log("loaded");
        renderListing(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  loadListings();

  // deletes a listing from the users listings

  $(document).on("click", "#button-form", function (event) {
    console.log("the target", event.target);
    event.preventDefault();
    const id = event.target.id;

    $.delete(`/api/myListings/${id}`).then((data) => {
      loadListings();
    });
  });

  // a user can click to mark their listing as sold

  $(document).on("click", "#sold-form", function (event) {
    event.preventDefault();
    const id = event.target.id;

    $.post(`/api/myListings/${id}`).then((data) => {
      loadListings();
    });
  });
});
