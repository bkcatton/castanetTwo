// Client facing scripts here
$(document).ready(function () {
  const $topRow = $(".top-row");
  const $addListing = function (listing) {
    console.log("kjhfgkjhdfsgkjhdfsgkj", listing);
    const $listingContainer = `<article class="single-listing">
    <a name="imagelink" id='' class="single-listing" href="/single_listing"> <img src='${listing.photo_url}' /></a>
  <h3>${listing.title}</h3>
  <h3>${listing.city}</h3>
  <h3>$${listing.price}</h3>
  <form method="POST" action="/api/myListings">
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

    // const $listingDiv = $("<div>");

    // if (listing.isactive) {
    //   const $para = $("<p>").text("true");
    //   return $listingDiv.append($listingContainer, $para);
    // } else if (!listing.isactive) {
    //   const $para2 = $("<p>");

    //   $(".single-listing").addClass("sold");
    //   return $listingDiv.append($listingContainer, $para2);
    // }
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
        console.log("data", data);
        renderListing(data);
        // console.log(listings);
      },
      error: (error) => {
        console.log("this request failed and this was the error", error);
      },
    });
  };
  loadListings();

  $topRow.on("click", (event) => {
    console.log("hello");
    console.log(event.target.id);
    event.stopPropagation();

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
