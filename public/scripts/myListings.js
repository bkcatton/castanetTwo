// Client facing scripts here
$(document).ready(function () {
  // // const $change = $('#target');
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
