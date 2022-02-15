// Client facing scripts here
$(document).ready(function () {
  const $addListing = function (listing) {
    localStorage.clear();

    $(".top-row").on("click", (e) => {
      console.log("this is in the onclick", e.target.id);
      localStorage.setItem("singleListingId", e.target.id);
    });
    // console.log("kjhfgkjhdfsgkjhdfsgkj", listing);
    const $listingContainer = `<article class="listing-container">
    <a name="imagelink" class="" href="/single_listing"><img class="img-pic" src='${listing.photo_url}' id='${listing.id}'/></a>
    ${listing.isactive === 'false' ? `<img class="img-pic" src='https://github.com/bkcatton/castanetTwo/blob/master/public/images/Sold.png?raw=true'/>` : `<h3>Active</h3>` }
  <h3 class="price">$${listing.price}</h3>
  <form id="button-form" method="POST" action="/api/myListings">
  <button id="${listing.id}" type="submit"> Delete </button>
  </form>

  <form class="isActiveForm" method="">
      <select name="isActive" id="isActive">
        <option value="">--Is this listing available--</option>
        <option value="true">Available</option>
        <option value="false">Sold</option>
      </select>
    </form>
  </article>`;

    return $listingContainer;
  };

  const renderListing = function (myListings) {
    const array = myListings.myListings;
    for (let listing of array) {
      const $item = $addListing(listing);
      $(".top-row").append($item);
    }
  };
  const loadListings = function () {
    $.ajax({
      url: "http://localhost:8080/api/myListings",
      method: "GET",
      dataType: "json",
      // data: {  }
      success: (data) => {
        // console.log("data", data);
        renderListing(data);
        // console.log(listings);
      },
      error: (error) => {
        console.log("this request failed and this was the error", error);
      },
    });
  };
  loadListings();

  $(document).on("click", "#button-form", function (event) {
    console.log("this in here", $(this)[0]);

    console.log("the target", event.target);
    // event.preventDefault();

    localStorage.setItem("deleteItem", event.target.id);
    const loadListings = function () {
      $.ajax({
        url: "http://localhost:8080/api/myListings",
        method: "POST",
        dataType: "json",
        data: { id: event.target.id },
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
});
